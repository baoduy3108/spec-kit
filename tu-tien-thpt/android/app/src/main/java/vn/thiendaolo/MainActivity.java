package vn.thiendaolo;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Vỏ bọc mỏng quanh bản HTML một tệp. Không mạng, không quyền, không
 * thư viện ngoài — chỉ Activity và WebView của hệ điều hành.
 *
 * Chỗ đáng nói duy nhất là ORIGIN. Nạp bằng file:///android_asset/ thì
 * trang chạy trên origin "null", mà localStorage ở đó WebView không cam
 * kết giữ qua các lần mở — tiến độ học có thể bay. Nên ở đây tự phục vụ
 * chính tệp ấy dưới một origin https nội bộ rồi chặn mọi yêu cầu tới
 * origin đó và đọc thẳng từ assets trong APK. Origin ổn định ⇒
 * localStorage ổn định, mà vẫn không có một gói tin nào rời khỏi máy.
 */
public class MainActivity extends Activity {

  private static final String HOST = "appassets.androidplatform.net";
  private static final String GOC  = "https://" + HOST + "/assets/index.html";

  private WebView web;

  @SuppressLint("SetJavaScriptEnabled")
  @Override
  protected void onCreate(Bundle luu) {
    super.onCreate(luu);

    web = new WebView(this);
    web.setLayoutParams(new ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    web.setBackgroundColor(Color.parseColor("#0d1117"));
    web.setOverScrollMode(View.OVER_SCROLL_NEVER);

    WebSettings ch = web.getSettings();
    ch.setJavaScriptEnabled(true);
    ch.setDomStorageEnabled(true);                   // localStorage — chỗ lưu tiến độ
    ch.setSupportZoom(false);
    ch.setBuiltInZoomControls(false);
    ch.setUseWideViewPort(false);
    ch.setLoadWithOverviewMode(false);
    ch.setMediaPlaybackRequiresUserGesture(false);   // tiếng trong game
    ch.setAllowFileAccess(false);
    ch.setAllowContentAccess(false);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) ch.setSafeBrowsingEnabled(false);

    web.setWebViewClient(new WebViewClient() {
      @Override
      public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest rq) {
        return phucVu(rq.getUrl());
      }
      /* Chặn mọi thứ trỏ ra ngoài — app này không có việc gì với internet. */
      @Override
      public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest rq) {
        return !HOST.equals(rq.getUrl().getHost());
      }
    });

    setContentView(web);
    if (luu != null) web.restoreState(luu); else web.loadUrl(GOC);
  }

  /** Trả tệp trong assets cho các yêu cầu tới origin nội bộ, ngoài ra trả null
   *  để WebView tự xử (mà nó sẽ hỏng vì không có mạng — đúng ý). */
  private WebResourceResponse phucVu(Uri u) {
    if (!HOST.equals(u.getHost())) return null;
    String d = u.getPath() == null ? "" : u.getPath();
    if (!d.startsWith("/assets/")) return null;
    String ten = d.substring("/assets/".length());
    if (ten.isEmpty() || ten.contains("..")) return null;
    try {
      InputStream vao = getAssets().open(ten);
      Map<String, String> dau = new HashMap<>();
      dau.put("Cache-Control", "no-store");
      return new WebResourceResponse(kieu(ten), "utf-8", 200, "OK", dau, vao);
    } catch (IOException e) {
      return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found",
          new HashMap<String, String>(), null);
    }
  }

  private static String kieu(String ten) {
    if (ten.endsWith(".html")) return "text/html";
    if (ten.endsWith(".js"))   return "text/javascript";
    if (ten.endsWith(".css"))  return "text/css";
    if (ten.endsWith(".png"))  return "image/png";
    if (ten.endsWith(".svg"))  return "image/svg+xml";
    return "application/octet-stream";
  }

  /* Nút Back của máy: lùi trong game trước, hết mới thoát app.
     onBackPressed vẫn là cách chạy đúng khi không bật
     enableOnBackInvokedCallback, mà mặc định là chưa bật. */
  @Override
  @SuppressWarnings("deprecation")
  public void onBackPressed() {
    if (web.canGoBack()) web.goBack(); else super.onBackPressed();
  }

  @Override protected void onSaveInstanceState(Bundle b) { super.onSaveInstanceState(b); web.saveState(b); }
  @Override protected void onPause()  { web.onPause();  super.onPause(); }
  @Override protected void onResume() { super.onResume(); web.onResume(); }
  @Override protected void onDestroy() { web.destroy(); super.onDestroy(); }
}
