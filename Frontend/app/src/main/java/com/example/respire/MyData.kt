package com.example.respire

import com.google.gson.annotations.SerializedName

data class MyData(
    val components: Components,
    val coord: Coord,
    val dt: Int,
    val index: Int
)