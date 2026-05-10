import { ACGLogo, ACGIcon, ACGLogoHorizontal, ACGLogoStacked, ACGMark } from './logos/ACGLogo';
import { Download } from 'lucide-react';

export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl mb-2 tracking-tight" style={{fontWeight: 800}}>ACG Logo Assets</h1>
          <p className="text-white/80">Complete brand identity system for Ascend Capital Group</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Primary Logo Variations */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Primary Logo - Full</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGLogo variant="primary" size="small" />
              </div>
              <p className="text-sm text-gray-600 text-center">Small</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGLogo variant="primary" size="default" />
              </div>
              <p className="text-sm text-gray-600 text-center">Default</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGLogo variant="primary" size="large" />
              </div>
              <p className="text-sm text-gray-600 text-center">Large</p>
            </div>
          </div>
        </section>

        {/* Icon Only */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Icon Only</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGIcon variant="primary" size="small" />
              </div>
              <p className="text-sm text-gray-600 text-center">Small (App Icon)</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGIcon variant="primary" size="default" />
              </div>
              <p className="text-sm text-gray-600 text-center">Default (Social Media)</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGIcon variant="primary" size="large" />
              </div>
              <p className="text-sm text-gray-600 text-center">Large (Hero)</p>
            </div>
          </div>
        </section>

        {/* Horizontal Lockup */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Horizontal Lockup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGLogoHorizontal variant="primary" size="small" />
              </div>
              <p className="text-sm text-gray-600 text-center">Compact</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGLogoHorizontal variant="primary" size="default" />
              </div>
              <p className="text-sm text-gray-600 text-center">Standard</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[120px]">
                <ACGLogoHorizontal variant="primary" size="large" />
              </div>
              <p className="text-sm text-gray-600 text-center">Extended</p>
            </div>
          </div>
        </section>

        {/* Stacked Logo */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Stacked Logo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[200px]">
                <ACGLogoStacked variant="primary" size="small" />
              </div>
              <p className="text-sm text-gray-600 text-center">Small</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[200px]">
                <ACGLogoStacked variant="primary" size="default" />
              </div>
              <p className="text-sm text-gray-600 text-center">Default</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center min-h-[200px]">
                <ACGLogoStacked variant="primary" size="large" />
              </div>
              <p className="text-sm text-gray-600 text-center">Large</p>
            </div>
          </div>
        </section>

        {/* Color Variations */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Color Variations</h2>
          <div className="space-y-8">
            {/* Primary on Light */}
            <div>
              <p className="text-sm text-gray-600 mb-4">Primary (on light backgrounds)</p>
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center">
                <ACGLogo variant="primary" size="default" />
              </div>
            </div>
            
            {/* White on Dark */}
            <div>
              <p className="text-sm text-gray-600 mb-4">White (on dark backgrounds)</p>
              <div className="bg-gradient-to-r from-[#1E1B4B] to-[#6366F1] p-8 rounded flex items-center justify-center">
                <ACGLogo variant="white" size="default" />
              </div>
            </div>

            {/* Dark Version */}
            <div>
              <p className="text-sm text-gray-600 mb-4">Dark (monochrome)</p>
              <div className="bg-gray-50 p-8 rounded flex items-center justify-center">
                <ACGLogo variant="dark" size="default" />
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Mark */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Minimal Mark</h2>
          <p className="text-gray-600 mb-6">Use for patterns, backgrounds, and small scale applications</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded flex items-center justify-center">
              <ACGMark variant="primary" size="small" />
            </div>
            <div className="bg-gray-50 p-8 rounded flex items-center justify-center">
              <ACGMark variant="primary" size="default" />
            </div>
            <div className="bg-gray-50 p-8 rounded flex items-center justify-center">
              <ACGMark variant="primary" size="large" />
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-gradient-to-r from-[#6366F1] to-[#F97316] rounded-lg p-8 text-white">
          <h2 className="text-2xl mb-6 tracking-tight" style={{fontWeight: 700}}>Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-3" style={{fontWeight: 700}}>✓ Do</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Use the full logo on light backgrounds</li>
                <li>• Use white variant on dark/colorful backgrounds</li>
                <li>• Maintain clear space around logo (minimum 1x icon height)</li>
                <li>• Use icon-only for small applications (favicons, app icons)</li>
                <li>• Keep gradient orientation consistent</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3" style={{fontWeight: 700}}>✗ Don't</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Change colors or gradient direction</li>
                <li>• Rotate or distort the logo</li>
                <li>• Add effects, shadows, or outlines</li>
                <li>• Place on busy backgrounds without proper contrast</li>
                <li>• Recreate or modify the skewed geometry</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 700}}>Brand Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="h-24 bg-[#6366F1] rounded-lg mb-3 shadow-lg"></div>
              <p className="text-sm text-gray-900" style={{fontWeight: 700}}>Royal Purple</p>
              <p className="text-xs text-gray-600">#6366F1</p>
            </div>
            <div>
              <div className="h-24 bg-[#F97316] rounded-lg mb-3 shadow-lg"></div>
              <p className="text-sm text-gray-900" style={{fontWeight: 700}}>Vibrant Orange</p>
              <p className="text-xs text-gray-600">#F97316</p>
            </div>
            <div>
              <div className="h-24 bg-white border-2 border-gray-200 rounded-lg mb-3"></div>
              <p className="text-sm text-gray-900" style={{fontWeight: 700}}>Pure White</p>
              <p className="text-xs text-gray-600">#FFFFFF</p>
            </div>
            <div>
              <div className="h-24 bg-[#1E1B4B] rounded-lg mb-3 shadow-lg"></div>
              <p className="text-sm text-gray-900" style={{fontWeight: 700}}>Deep Indigo</p>
              <p className="text-xs text-gray-600">#1E1B4B</p>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="bg-gradient-to-br from-[#1E1B4B] to-[#6366F1] rounded-lg p-8 text-white text-center">
          <Download className="w-12 h-12 mx-auto mb-4 text-[#F97316]" />
          <h2 className="text-2xl mb-3 tracking-tight" style={{fontWeight: 700}}>Ready to Use</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            All logo components are built as React components and ready to use throughout your website. Simply import the component you need and apply the appropriate variant and size props.
          </p>
          <code className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded text-sm inline-block">
            import &#123; ACGLogo &#125; from './components/logos/ACGLogo'
          </code>
        </section>

      </div>
    </div>
  );
}
