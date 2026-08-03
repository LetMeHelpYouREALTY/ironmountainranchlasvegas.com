import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import ImrHyperlocalBand from "@/components/sections/ImrHyperlocalBand";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import { FEATURED_PROPERTY_IMAGES } from "@/lib/page-images";

export const metadata: Metadata = {
  title: "Property Details | Iron Mountain Ranch & Las Vegas Real Estate",
  description:
    "View detailed information about this property listing in Iron Mountain Ranch, northwest Las Vegas, or the greater Las Vegas Valley.",
};

const DEMO_PROPERTIES: Record<
  string,
  {
    id: string;
    name: string;
    location: string;
    price: string;
    image: string;
    imageAlt: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    description: string;
  }
> = {
  "1": {
    id: "1",
    name: "Gated Village Home",
    location: "Iron Mountain Ranch, Las Vegas, NV 89131",
    price: "$585,000",
    image: FEATURED_PROPERTY_IMAGES.imrGated.src,
    imageAlt: FEATURED_PROPERTY_IMAGES.imrGated.alt,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    yearBuilt: 2006,
    description:
      "Mediterranean-style home in a gated Iron Mountain Ranch village. Open great room, updated kitchen, and a private backyard with desert mountain views. Close to the 215 Beltway and Centennial Hills shopping.",
  },
  "2": {
    id: "2",
    name: "Spacious Family Home",
    location: "Henderson, NV",
    price: "$625,000",
    image: FEATURED_PROPERTY_IMAGES.henderson.src,
    imageAlt: FEATURED_PROPERTY_IMAGES.henderson.alt,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2400,
    yearBuilt: 2012,
    description:
      "Spacious Henderson family home with a bright open floor plan, covered patio, and mature landscaping. Convenient to parks, shopping, and the 215 corridor.",
  },
  "3": {
    id: "3",
    name: "Elegant Estate",
    location: "Green Valley, Henderson, NV",
    price: "$1,200,000",
    image: FEATURED_PROPERTY_IMAGES.greenValley.src,
    imageAlt: FEATURED_PROPERTY_IMAGES.greenValley.alt,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4500,
    yearBuilt: 2015,
    description:
      "Elegant Green Valley estate with formal living spaces, chef’s kitchen, and a resort-style backyard. Premium finishes throughout in one of Henderson’s most established communities.",
  },
};

async function getProperty(id: string) {
  return (
    DEMO_PROPERTIES[id] ?? {
      id,
      name: "Iron Mountain Ranch Home",
      location: "Iron Mountain Ranch, Las Vegas, NV 89131",
      price: "Price upon request",
      image: FEATURED_PROPERTY_IMAGES.imrGated.src,
      imageAlt: FEATURED_PROPERTY_IMAGES.imrGated.alt,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2800,
      yearBuilt: 2005,
      description:
        "Single-family home in Iron Mountain Ranch with Mediterranean curb appeal, open living areas, and easy access to northwest Las Vegas amenities. Contact Dr. Jan Duffy for current availability and comps.",
    }
  );
}

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-slate-600">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a
                  href="http://drjanduffy.realscout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  Properties
                </a>
              </li>
              <li>/</li>
              <li className="text-slate-900">{property.name}</li>
            </ol>
          </nav>

          {/* Property Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {property.name}
            </h1>
            <div className="flex items-center text-slate-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              {property.location}
            </div>
            <div className="text-3xl font-bold text-blue-600">{property.price}</div>
          </div>

          {/* Main Image */}
          <div className="relative h-64 md:h-96 overflow-hidden mb-8">
            <Image
              src={property.image}
              alt={property.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* RealScout MLS carousel — below hero on every page */}
        <RealScoutListings compact />

        <div className="container mx-auto px-4">
          {/* Property Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Property Details</h2>
              <p className="text-slate-700 mb-6">{property.description}</p>

              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">
                      {property.squareFeet.toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">Built {property.yearBuilt}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule a Showing</h3>
                <p className="text-slate-700 mb-4">
                  Contact us to schedule a private viewing of this property.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/contact">Contact Agent</a>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Agent</h3>
                <p className="text-slate-600 mb-4">Dr. Jan Duffy</p>
                <p className="text-sm text-slate-600 mb-6">
                  Iron Mountain Ranch | Homes by Dr. Jan Duffy
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <a href="tel:+17025001942">Call (702) 500-1942</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/contact">Send Message</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ImrHyperlocalBand topic="buy" />
      <Footer />
    </>
  );
}
