package com.example.respire

import android.graphics.Rect
import android.location.GpsStatus
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.example.respire.databinding.ActivityLandingBinding
import com.example.respire.databinding.ActivityOsmMapBinding
import org.osmdroid.api.IMapController
import org.osmdroid.config.Configuration
import org.osmdroid.events.MapListener
import org.osmdroid.events.ScrollEvent
import org.osmdroid.events.ZoomEvent
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.mylocation.GpsMyLocationProvider
import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay

class OsmMap : AppCompatActivity(), MapListener, GpsStatus.Listener {
    lateinit var binding: ActivityOsmMapBinding
    lateinit var mMap: MapView
    lateinit var controller: IMapController;
    lateinit var mMyLocationOverlay: MyLocationNewOverlay;


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOsmMapBinding.inflate(layoutInflater)
        setContentView(binding.root)

        Configuration.getInstance().load(
            applicationContext,
            getSharedPreferences(getString(R.string.app_name), MODE_PRIVATE)
        )
        mMap = binding.osmmap
        mMap.setTileSource(TileSourceFactory.MAPNIK)
        mMap.mapCenter
        mMap.setMultiTouchControls(true)
        mMap.getLocalVisibleRect(Rect())


        mMyLocationOverlay = MyLocationNewOverlay(GpsMyLocationProvider(this), mMap)
        controller = mMap.controller

        val initialLocation = GeoPoint(27.65311, 85.302252)
        mMap.controller.setCenter(initialLocation)
        mMap.controller.setZoom(17.0)
        controller.animateTo(initialLocation)

//        mMyLocationOverlay.enableMyLocation()
//        mMyLocationOverlay.enableFollowLocation()
//        mMyLocationOverlay.isDrawAccuracyEnabled = true
//        mMyLocationOverlay.runOnFirstFix {
//            runOnUiThread {
//                controller.setCenter(mMyLocationOverlay.myLocation);
//                controller.animateTo(mMyLocationOverlay.myLocation)
//            }
//        }
        // val mapPoint = GeoPoint(latitude, longitude)

        //controller.setZoom(6.0)

        Log.e("TAG", "onCreate:in ${controller.zoomIn()}")
        Log.e("TAG", "onCreate: out  ${controller.zoomOut()}")

        // controller.animateTo(mapPoint)
        mMap.overlays.add(mMyLocationOverlay)

        mMap.addMapListener(this@OsmMap)

        val marker = Marker(mMap)
        marker.position = initialLocation
        marker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
        marker.title = "Bhaisipati"
        marker.snippet = "Air Quality: 48"

        // Add the marker to the map's overlay
        mMap.overlays.add(marker)

        // Refresh the map to display the marker
        mMap.invalidate()

    }

    override fun onScroll(event: ScrollEvent?): Boolean {
        // event?.source?.getMapCenter()
        Log.e("TAG", "onCreate:la ${event?.source?.getMapCenter()?.latitude}")
        Log.e("TAG", "onCreate:lo ${event?.source?.getMapCenter()?.longitude}")
        //  Log.e("TAG", "onScroll   x: ${event?.x}  y: ${event?.y}", )
        return true
    }

    override fun onZoom(event: ZoomEvent?): Boolean {
        //  event?.zoomLevel?.let { controller.setZoom(it) }


        Log.e("TAG", "onZoom zoom level: ${event?.zoomLevel}   source:  ${event?.source}")
        return false;
    }

    override fun onGpsStatusChanged(event: Int) {


        TODO("Not yet implemented")
    }
}