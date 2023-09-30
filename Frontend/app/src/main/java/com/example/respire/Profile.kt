package com.example.respire
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.auth0.android.Auth0
import com.auth0.android.authentication.AuthenticationAPIClient
import com.auth0.android.authentication.AuthenticationException
import com.auth0.android.authentication.storage.CredentialsManager
import com.auth0.android.authentication.storage.SharedPreferencesStorage
import com.auth0.android.provider.WebAuthProvider
import com.auth0.android.provider.WebAuthProvider.logout
import com.auth0.android.result.UserProfile
import com.example.respire.databinding.ActivityMainBinding
import com.example.respire.databinding.FragmentProfileBinding
import com.google.android.material.snackbar.Snackbar
import javax.security.auth.callback.Callback


class Profile : Fragment() {

    companion object {
        fun newInstance() = Fragment()
    }

    private var fragbinding : FragmentProfileBinding? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        fragbinding = FragmentProfileBinding.inflate(inflater, container, false)





        // Inflate the layout for this fragment
        return fragbinding!!.root
    }


}