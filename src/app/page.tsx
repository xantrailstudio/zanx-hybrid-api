export default function Home() {
  return (
    <div className="container">
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>

      {/* Hero Section */}
      <section className="hero">
        <div className="badge">ZanX Universal API v1.0</div>
        <h1>ZanX Invisible API</h1>
        <p>
          A high-speed, headless image conversion engine built for the next generation of web apps. 
          Bypass serverless payload limits and transform high-resolution images via streaming.
        </p>
        <div className="code-block" style={{ textAlign: 'center' }}>
          GET /api/convert?url=&#123;IMAGE_URL&#125;
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2>Core Capabilities</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Infinity Engine</h3>
            <p>Processes 20MB+ files on standard serverless accounts by using chunk-based streaming instead of memory buffering.</p>
          </div>
          <div className="feature-card">
            <h3>Headless first</h3>
            <p>Designed for direct integration. No frontend needed. Return processed images directly to `&lt;img&gt;` tags or background fetches.</p>
          </div>
          <div className="feature-card">
            <h3>Auto-Optimizer</h3>
            <p>Built-in Sharp integration for industry-leading JPEG compression, progressive loading, and metadata stripping.</p>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section>
        <h2>API Documentation</h2>
        <h3>Endpoint</h3>
        <div className="code-block">
          GET /api/convert
        </div>

        <h3>Query Parameters</h3>
        <ul className="parameter-list">
          <li className="parameter-item">
            <span className="param-name">url</span>
            <span className="param-desc">The direct URL of the source PNG image to be converted. (Required)</span>
          </li>
          <li className="parameter-item">
            <span className="param-name">format</span>
            <span className="param-desc">Internal default is `jpeg`. Future support for `webp` and `avif`. (Optional)</span>
          </li>
        </ul>

        <h3>Headers</h3>
        <ul className="parameter-list">
          <li className="parameter-item">
            <span className="param-name">Content-Type</span>
            <span className="param-desc">`image/jpeg`</span>
          </li>
          <li className="parameter-item">
            <span className="param-name">Cache-Control</span>
            <span className="param-desc">`public, s-maxage=31536000` (1 Year Browser/CDN Cache)</span>
          </li>
          <li className="parameter-item">
            <span className="param-name">CORS</span>
            <span className="param-desc">`Access-Control-Allow-Origin: *` (Enabled for all domains)</span>
          </li>
        </ul>
      </section>

      {/* Integration Section */}
      <section>
        <h2>Quick Integration</h2>
        
        <h3>HTML Image Tag</h3>
        <p>Use it directly as a source for your image tags. No JavaScript required.</p>
        <div className="code-block">
{`<img 
  src="/api/convert?url=https://example.com/source.png" 
  alt="Converted Image" 
/>`}
        </div>

        <h3>JavaScript Fetch</h3>
        <p>Fetch binary image data for client-side processing or dynamic downloads.</p>
        <div className="code-block">
{`const fetchImage = async (url) => {
  const response = await fetch(\`/api/convert?url=\${url}\`);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  document.querySelector('#myImg').src = objectURL;
};`}
        </div>

        <h3>cURL (Terminal)</h3>
        <p>Download images directly from your command line.</p>
        <div className="code-block">
          curl -L "/api/convert?url=SOURCE_URL" -o image.jpg
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span>© 2026 ZanX Hybrid Engine</span>
        <span>Built by AbdulAziz Memon • MIT</span>
      </footer>
    </div>
  );
}
