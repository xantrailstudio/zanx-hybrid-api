# ZanX Universal Image API v2.0

**ZanX Universal Image API** is a high-performance, multi-format Headless API engine built with Next.js and Sharp. It is specifically designed to bypass serverless payload limits (like Vercel's 4.5MB limit) by using an optimized real-time streaming pipeline.

![ZanX Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop)

## 🚀 Key Features (v2.0)

- **Multi-Format Support**: Input support for all major formats (PNG, JPG, WEBP, AVIF, GIF, TIFF, SVG).
- **Next-Gen Output**: Choose between `jpg`, `webp`, `png`, and **`avif`** (v2.0 highlight).
- **Infinite Streaming**: Process high-resolution images (20MB+) without memory crashes.
- **headless Engine**: Zero-visit integration. Use it directly as an image source.
- **Auto-Optimization**: Metadata stripping and progressive loading enabled by default.
- **Enhanced Security**: Protocol checks and robust error mapping for safe public use.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Engine**: Sharp (High-performance Node.js image processing)
- **Runtime**: Node.js 18+ (Explicitly set to `nodejs` runtime)

## 📖 API Usage

### Endpoint
`GET /api/convert?url={IMAGE_URL}&to={format}`

### Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | **Required**. The direct link to your source image. |
| `to` | `string` | **Optional**. Target format (`jpg`, `webp`, `png`, `avif`). Default is `jpg`. |

### Integration Examples

#### HTML
```html
<img src="https://your-api.vercel.app/api/convert?url=https://example.com/image.png&to=webp" alt="Converted Image" />
```

#### JavaScript (Fetch)
```javascript
const response = await fetch('/api/convert?url=your_url&to=avif');
const blob = await response.blob();
const imgUrl = URL.createObjectURL(blob);
```

## 💻 Local Development

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the dev server**:
   ```bash
   npm run dev
   ```
4. **Test the API**:
   Open `http://localhost:3000/api/convert?url=YOUR_URL&to=webp`

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by **AbdulAziz Memon**.
