package com.example.respire

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.respire.databinding.ActivityLandingBinding
import com.example.respire.databinding.ActivitySearchLocationBinding

class SearchLocation : AppCompatActivity() {

    lateinit var binding: ActivitySearchLocationBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivitySearchLocationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.SubmitButton.setOnClickListener {
            val intent = Intent(this@SearchLocation, OsmMap::class.java)
            startActivity(intent)
        }

    }
}