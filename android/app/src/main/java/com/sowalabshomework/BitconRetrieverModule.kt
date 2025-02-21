package com.sowalabshomework
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.util.Log
import android.widget.Toast
import okhttp3.OkHttpClient
import okhttp3.Request
import android.os.Looper
import android.os.Handler
import org.json.JSONArray
import org.json.JSONObject
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.WritableNativeArray


class BitconRetrieverModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val client = OkHttpClient()
  private val handler = Handler(Looper.getMainLooper())
  private val fetchInterval = 60000L // 60 seconds

  private val fetchPriceRunnable = object : Runnable {
    override fun run() {
      getBitcoinPrice()
      handler.postDelayed(this, fetchInterval)
    }
  }

  override fun getName() = "BitconRetrieverModule"

  @ReactMethod
  fun startFetchingBitcoinPrice() {
    handler.post(fetchPriceRunnable)
  }

  @ReactMethod
  fun stopFetchingBitcoinPrice() {
    handler.removeCallbacks(fetchPriceRunnable)
  }

  @ReactMethod
  fun getBitcoinPrice() {

    val request = Request.Builder()
      .url("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=30&interval=daily")
      .build()

    Thread {
      try {
        val response = client.newCall(request).execute()
          if (response.isSuccessful) {
            val jsonResponse = JSONObject(response.body?.string())
            val prices: JSONArray = jsonResponse.getJSONArray("prices")

            val allPrices = WritableNativeArray()

            for (i in 0 until prices.length()) {
              val priceData = prices.getJSONArray(i)
              val timestamp = priceData.getLong(0)
              val price = priceData.getDouble(1)
              
              val priceMap = WritableNativeMap()
              priceMap.putDouble("timestamp", timestamp.toDouble())
              priceMap.putDouble("priceInEur", price)

              allPrices.pushMap(priceMap)
            }

             sendBitcoinPricesUpdatedEvent(allPrices)
          } else {
            sendErrorEvent("API request failed")
          }
        } catch (e: Exception) {
          sendErrorEvent("Request error: ${e.message}")
        }
      }.start()
    }

    private fun sendBitcoinPricesUpdatedEvent(prices: Any) {
      val eventEmitter = reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      eventEmitter.emit("bitcoinPricesUpdated", prices)
    }

    private fun sendErrorEvent(errorMessage: String) {
      val eventEmitter = reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      eventEmitter.emit("bitcoinPriceError", errorMessage)
    }
}