export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h4 className="font-medium">Inherify</h4>
            <p className="text-muted-foreground text-sm mb-4">Secure Your Legacy on Telos Blockchain</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-input rounded-full px-4 py-2 text-sm flex-1"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Legal Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 Inherify. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

