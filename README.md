# ZanX Universal Image API

**ZanX Universal Image API** is a high-performance, headless image conversion engine built with Next.js and Sharp. It is specifically designed to bypass serverless payload limits (like Vercel's 4.5MB limit) by using a real-time streaming pipeline.

![ZanX Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop)

## 🚀 Key Features

- **Infinite Streaming**: Process high-resolution images (20MB+) without memory crashes.
- **headless Engine**: Zero-visit integration. Use it directly as an image source.
- **Auto-Optimization**: Progressive JPEGs with stripped metadata for maximum speed.
- **Universal CORS**: Access the API from any domain.
- **Extreme Caching**: Pre-configured headers for CDN and browser caching.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Engine**: Sharp (High-performance Node.js image processing)
- **Runtime**: Node.js 18+

## 📖 API Usage

### Endpoint
`GET /api/convert?url={IMAGE_URL}`

### Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | **Required**. The direct link to your source PNG image. |

### Integration Examples

#### HTML
```html
<img src="https://your-api.vercel.app/api/convert?url=https://example.com/image.png" alt="Converted Image" />
```

#### JavaScript (Fetch)
```javascript
const response = await fetch('/api/convert?url=your_png_url');
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
   Open `http://localhost:3000/api/convert?url=YOUR_PNG_URL`

## 📄 License

This project is licensed under the **MIT License**. see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by **ZanX Hybrid Engine team**.
