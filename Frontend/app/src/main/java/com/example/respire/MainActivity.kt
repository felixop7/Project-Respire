package com.example.respire

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat.startActivity
import com.auth0.android.Auth0
import com.auth0.android.authentication.AuthenticationAPIClient
import com.auth0.android.authentication.AuthenticationException
import com.auth0.android.authentication.storage.CredentialsManager
import com.auth0.android.authentication.storage.SharedPreferencesStorage
import com.auth0.android.callback.Callback
import com.auth0.android.provider.WebAuthProvider
import com.auth0.android.provider.WebAuthProvider.logout
import com.auth0.android.result.UserProfile
import com.example.respire.databinding.ActivityMainBinding
import com.google.android.material.snackbar.Snackbar
import java.io.Serializable



class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var account: Auth0
    private var cachedCredentials: com.auth0.android.result.Credentials? = null
    private var cachedUserProfile: UserProfile? = null
    private var signedIn: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        account = Auth0(
            getString(R.string.com_auth0_client_id),
            getString(R.string.com_auth0_domain)
        )
        val data = intent.data
        if (data != null && data.toString().startsWith("http://localhost:3000/callback")) {
            // Handle the Auth0 callback here for local development
        }

        binding.loginbtn.setOnClickListener {
            if(signedIn){
                binding.loginbtn.text = "Sign In"
                logout()
                signedIn = false
            }else {
                binding.loginbtn.text = "Sign Out"
                loginWithBrowser()
                signedIn = true
            }
        }
    }

    private fun loginWithBrowser() {
        // Setup the WebAuthProvider, using the custom scheme and scope.
        WebAuthProvider.login(account)
            .withScheme("demo")
            .withScope("openid profile email read:current_user update:current_user_metadata")
            .withAudience("https://${getString(R.string.com_auth0_domain)}/api/v2/")

            // Launch the authentication passing the callback where the results will be received
            .start(this, object :
                com.auth0.android.callback.Callback<com.auth0.android.result.Credentials, AuthenticationException> {
                override fun onFailure(exception: AuthenticationException) {
                    showSnackBar("Failure: ${exception.getCode()}")
                }

                override fun onSuccess(credentials: com.auth0.android.result.Credentials) {
                    cachedCredentials = credentials
                    showSnackBar("Success: ${credentials.accessToken}")
                    val intent = Intent(this@MainActivity, Landing::class.java)
                    startActivity(intent)
                }
            })
    }

    private fun logout() {
        WebAuthProvider.logout(account)
            .withScheme("demo")
            .start(this, object : Callback<Void?, AuthenticationException> {
                override fun onSuccess(payload: Void?) {
                    // The user has been logged out!
                    cachedCredentials = null
                    cachedUserProfile = null
                }

                override fun onFailure(exception: AuthenticationException) {
                    showSnackBar("Failure: ${exception.getCode()}")
                }
            })
    }

    private fun showSnackBar(text: String) {
        Snackbar.make(
            binding.root,
            text,
            Snackbar.LENGTH_LONG
        ).show()
    }


}