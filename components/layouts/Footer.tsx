import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig, agentInfo, officeInfo } from "@/lib/site-config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-1">{siteConfig.name}</h3>
            <p className="text-blue-300 text-sm mb-4">{siteConfig.byline}</p>
            <p className="text-slate-300 mb-4 text-sm">
              Northwest Las Vegas real estate (89131 &amp; 89143), also serving Centennial Hills,
              Skye Canyon, and the greater Las Vegas Valley.
            </p>
            <div className="flex space-x-4">
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Search Las Vegas Homes"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Search Las Vegas Homes"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Search Las Vegas Homes"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://drjanduffy.realscout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  All Properties
                </a>
              </li>
              <li>
                <Link
                  href="/neighborhoods/iron-mountain-ranch"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Iron Mountain Ranch Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhoods"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Neighborhoods
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  About Dr. Jan
                </Link>
              </li>
              <li>
                <Link
                  href="/market-report"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Market Report
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Real Estate Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/buyers"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Home Buying
                </Link>
              </li>
              <li>
                <Link
                  href="/buyers/california-relocator"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  California Relocators
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Home Selling
                </Link>
              </li>
              <li>
                <Link
                  href="/luxury-homes"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Luxury Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/55-plus-communities"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  55+ Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/new-construction"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  New Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/market-insights"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - NAP (Name, Address, Phone) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Dr. Jan Duffy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  7960 N Decatur Blvd, Suite B
                  <br />
                  North Las Vegas, NV 89085
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href="tel:+17025001942"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  (702) 500-1942
                </Link>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <Link
                    href={`mailto:${agentInfo.email}`}
                    className="text-slate-300 hover:text-white transition-colors text-sm break-all"
                  >
                    {agentInfo.email}
                  </Link>
                  <Link
                    href={`mailto:${agentInfo.emailSales}`}
                    className="text-slate-300 hover:text-white transition-colors text-sm break-all"
                  >
                    {agentInfo.emailSales}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} {siteConfig.name} · {siteConfig.byline}. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/faq" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">
            {agentInfo.name}, REALTOR® | License {agentInfo.license} | {agentInfo.brokerage}
          </p>
          <p className="text-slate-600 text-xs mt-2 text-center max-w-3xl mx-auto">
            {officeInfo.address.full} · {agentInfo.phoneFormatted}
          </p>
        </div>
      </div>
    </footer>
  );
}
