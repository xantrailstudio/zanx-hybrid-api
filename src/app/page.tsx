export default function Home() {
  return (
    <div className="container">
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>

      {/* Hero Section */}
      <section className="hero">
        <div className="badge">ZanX Universal API v2.0</div>
        <h1>ZanX Invisible API</h1>
        <p>
          A high-speed, high-performance image conversion engine. 
          Bypass serverless payload limits and transform between all major web formats via streaming.
        </p>
        <div className="code-block" style={{ textAlign: 'center' }}>
          GET /api/convert?url=&#123;IMAGE_URL&#125;&to=&#123;format&#125;
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
            <h3>Multi-Format v2.0</h3>
            <p>Support for WebP, AVIF, PNG, and JPEG. Transform any public URL instantly with optimized compression.</p>
          </div>
          <div className="feature-card">
            <h3>Auto-Optimizer</h3>
            <p>Built-in metadata stripping and progressive loading to ensure the smallest possible payload for your users.</p>
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
            <span className="param-desc">The direct URL of the source image (PNG, JPG, WEBP, AVIF, GIF, TIFF, SVG). (Required)</span>
          </li>
          <li className="parameter-item">
            <span className="param-name">to</span>
            <span className="param-desc">Target format: `jpg`, `png`, `webp`, or `avif`. Default is `jpg`. (Optional)</span>
          </li>
        </ul>

        <h3>Security & Errors</h3>
        <ul className="parameter-list">
          <li className="parameter-item">
            <span className="param-name">400</span>
            <span className="param-desc">Returned for invalid URLs, unsupported formats, or 404 source images.</span>
          </li>
          <li className="parameter-item">
            <span className="param-name">SSRF</span>
            <span className="param-desc">Only `http` and `https` protocols are allowed for security.</span>
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
  src="/api/convert?url=https://example.com/source.png&to=webp" 
  alt="Converted Image" 
/>`}
        </div>

        <h3>JavaScript Fetch</h3>
        <p>Fetch binary image data for client-side processing or dynamic downloads.</p>
        <div className="code-block">
{`const fetchImage = async (url) => {
  const response = await fetch(\`/api/convert?url=\${url}&to=avif\`);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  document.querySelector('#myImg').src = objectURL;
};`}
        </div>

        <h3>cURL (Terminal)</h3>
        <p>Download images directly from your command line.</p>
        <div className="code-block">
          curl -L "/api/convert?url=SOURCE_URL&to=jpg" -o image.jpg
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
