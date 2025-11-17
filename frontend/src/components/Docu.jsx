import React from "react";
import { 
  BookOpen, Users, DollarSign, FileText, 
  Download, Bell, Zap, CheckCircle,
  Home, Calculator, Smartphone, BarChart3,
  Shield, Heart
} from "lucide-react";

export default function Docu() {
  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Auto Bill Splitting",
      desc: "Expenses automatically divided equally among roommates"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Updates",
      desc: "Instant sync across all devices"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Reminders",
      desc: "Get notified about due payments"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Reports",
      desc: "PDF & Excel reports for complete transparency"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "UPI Settlement",
      desc: "Quick payments via Google Pay, PhonePe, Paytm"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      desc: "Your data stays safe and encrypted"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Room",
      english: "Create a new room and invite your roommates",
      hindi: "नया room बनाएं और दोस्तों को add करें"
    },
    {
      number: "02",
      title: "Add Expenses",
      english: "Add expenses whenever someone makes a payment",
      hindi: "जब भी कोई payment करे, expense add करो"
    },
    {
      number: "03",
      title: "Auto Split",
      english: "Bills automatically divided equally",
      hindi: "Bill अपने आप equal parts में divide होता है"
    },
    {
      number: "04",
      title: "View Balances",
      english: "See who owes what and track settlements",
      hindi: "देखें किसने कितना देना है या लेना है"
    },
    {
      number: "05",
      title: "Settle via UPI",
      english: "Quick payments using UPI apps",
      hindi: "Google Pay / PhonePe / Paytm से payment करें"
    },
    {
      number: "06",
      title: "Export Reports",
      english: "Download monthly expense reports",
      hindi: "Monthly expenses PDF में save करें"
    }
  ];

  const tips = [
    "Add expenses immediately after payment",
    "Use equal split for most shared expenses",
    "Download PDF reports monthly for records",
    "Settle dues weekly to avoid pile-up",
    "Keep expense descriptions clear",
    "Use categories for better organization"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-blue-100 mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Guide
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete guide to managing shared expenses with your roommates. 
            Simple, automatic, and hassle-free.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Introduction / परिचय</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-lg leading-relaxed">
            <div className="space-y-4">
              <p className="text-gray-700">
                This comprehensive guide helps you master the Real-Time Roommate Expense Manager app. 
                Learn how to effortlessly add expenses, split bills, manage rooms, and export detailed reports.
              </p>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-blue-800 font-medium">
                  Perfect for students, working professionals, and anyone sharing living spaces.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                यह गाइड आपको सिखाएगी कि कैसे आप आसान steps में room expenses add, split, manage 
                और export कर सकते हैं। कोई confusion नहीं, सब कुछ automatic।
              </p>
              <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                <p className="text-green-800 font-medium">
                  Students और working professionals दोनों के लिए बिल्कुल परफेक्ट।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Our App? / ऐप क्यों खास है?</h2>
            <p className="text-gray-600 text-lg">Everything you need for stress-free expense sharing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">Step-by-Step Guide / कैसे उपयोग करें</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm leading-relaxed">{step.english}</p>
                  <p className="text-gray-600 text-sm leading-relaxed bg-white/50 rounded-lg p-3 border border-gray-200">
                    {step.hindi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="h-8 w-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Best Practices & Tips / बेस्ट टिप्स</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Do's / क्या करें</h3>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefits / फायदे</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">No More Confusion</h4>
                  <p className="text-green-700 text-sm">Clear records eliminate disputes and misunderstandings</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Save Time</h4>
                  <p className="text-blue-700 text-sm">Automatic calculations save hours of manual work</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Peace of Mind</h4>
                  <p className="text-purple-700 text-sm">Know exactly where your money goes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="text-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6">
            <Heart className="h-8 w-8 text-white" />
            <h2 className="text-2xl font-bold">Ready to Simplify Your Shared Expenses?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">For English Speakers</h3>
              <p className="leading-relaxed">
                This app transforms roommate living by eliminating financial confusion. 
                Automatic calculations, real-time updates, and easy settlements make 
                shared expenses completely hassle-free.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">हिंदी में</h3>
              <p className="leading-relaxed">
                यह app room/flat share करने वालों के लिए बहुत उपयोगी है। 
                कोई confusion नहीं, कोई manual calculation नहीं — सब कुछ automatic। 
                अब roommates के साथ expenses manage करना बिल्कुल आसान।
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-lg font-semibold">
              🚀 Start managing your shared expenses the smart way today!
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Need help? Contact support • v1.0 • Made with ❤️ for easier roommate living
          </p>
        </footer>
      </div>
    </div>
  );
}