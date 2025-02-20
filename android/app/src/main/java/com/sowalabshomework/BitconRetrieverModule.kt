package com.sowalabshomework
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.util.Log
import android.widget.Toast

class BitconRetrieverModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "BitconRetrieverModule"

	@ReactMethod fun sayHello(name: String, location: String) {
		Log.d("BitconRetrieverModule", "Create event called with name: $name and location: $location")
	
	  val message = "Hello $name from $location"
      Toast.makeText(reactApplicationContext, message, Toast.LENGTH_LONG).show()

      sendBitcoinPriceUpdatedEvent(10.2)
	}

    private fun sendBitcoinPriceUpdatedEvent(price: Double) {
      // Use DeviceEventManagerModule to send the event to JavaScript
      val eventEmitter = reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      eventEmitter.emit("bitcoinPriceUpdated", price)  // Event name and data (price)
    }

    private fun sendErrorEvent(errorMessage: String) {
        val eventEmitter = reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        eventEmitter.emit("BitcoinPriceError", errorMessage)  // Event name and data (error message)
    }

}