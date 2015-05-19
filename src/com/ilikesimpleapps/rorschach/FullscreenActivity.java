package com.ilikesimpleapps.rorschach;

import com.ilikesimpleapps.rorschach.R;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class FullscreenActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.activity_fullscreen);
	
		final WebView contentView = (WebView)findViewById(R.id.fullscreen_content);
		contentView.getSettings().setJavaScriptEnabled(true);
		contentView.setWebChromeClient(new WebChromeClient());
		contentView.loadUrl("file:///android_asset/www/index.html");

	}
}
