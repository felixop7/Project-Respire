package com.example.respire

import retrofit2.Call
import retrofit2.http.GET

interface ApiInterface {
    @GET("api/pollution")
    fun getData(): Call<MyData>
}