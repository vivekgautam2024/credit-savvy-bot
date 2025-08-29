import { useState } from "react";
import { CreditVerificationForm } from "@/components/CreditVerificationForm";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MessageSquare, 
  FileText, 
  Clock, 
  Users, 
  TrendingUp,
  CreditCard,
  Building,
  CheckCircle2
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('chat');

  const features = [
    {
      icon: Shield,
      title: "Secure Verification",
      description: "Bank-grade security for all your personal and financial data"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get eligibility results in under 2 minutes with our AI assistant"
    },
    {
      icon: FileText,
      title: "Document Verification",
      description: "Automated document verification with OCR technology"
    },
    {
      icon: TrendingUp,
      title: "Credit Score Improvement",
      description: "Get personalized tips to improve your credit profile"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Applications Processed", icon: Users },
    { value: "95%", label: "Approval Rate", icon: CheckCircle2 },
    { value: "2 mins", label: "Average Processing", icon: Clock },
    { value: "₹10Cr+", label: "Loans Sanctioned", icon: Building }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-primary-foreground py-20 px-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            AI-Powered Credit Verification
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Instant Loan & Credit Card
            <br />
            <span className="text-primary-glow">Eligibility Check</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Get pre-approved for loans and credit cards in minutes. Our AI chatbot provides instant eligibility verification with personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setActiveTab('chat')}
              className="text-lg px-8 py-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start AI Chat
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setActiveTab('form')}
              className="text-lg px-8 py-4 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <FileText className="mr-2 h-5 w-5" />
              Full Application
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary-foreground/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-6 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chat')}
              className={`px-8 py-3 ${activeTab === 'chat' ? 'bg-gradient-primary' : ''}`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Chat Assistant
            </Button>
            <Button
              variant={activeTab === 'form' ? 'default' : 'outline'}
              onClick={() => setActiveTab('form')}
              className={`px-8 py-3 ${activeTab === 'form' ? 'bg-gradient-primary' : ''}`}
            >
              <FileText className="mr-2 h-4 w-4" />
              Detailed Application
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'chat' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatBot />
              </div>
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      Available Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-card rounded-lg border">
                      <h4 className="font-semibold text-foreground">Personal Loans</h4>
                      <p className="text-sm text-muted-foreground">₹50K - ₹10L at 10.5% onwards</p>
                    </div>
                    <div className="p-4 bg-gradient-card rounded-lg border">
                      <h4 className="font-semibold text-foreground">Credit Cards</h4>
                      <p className="text-sm text-muted-foreground">Premium & Standard options</p>
                    </div>
                    <div className="p-4 bg-gradient-card rounded-lg border">
                      <h4 className="font-semibold text-foreground">Home Loans</h4>
                      <p className="text-sm text-muted-foreground">Up to ₹5Cr at 8.5% onwards</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <p className="text-sm">Maintain regular income for 6+ months</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <p className="text-sm">Keep your credit score above 750</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <p className="text-sm">Reduce existing debt obligations</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <CreditVerificationForm />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of credit verification with AI-powered instant eligibility checking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-in border-0 bg-gradient-card">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h3 className="text-2xl font-bold">SecureCredit</h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Powered by advanced AI and machine learning algorithms to provide the most accurate and instant credit verification in the industry.
          </p>
          <Badge variant="outline" className="text-xs">
            Protected by 256-bit SSL encryption
          </Badge>
        </div>
      </footer>
    </div>
  );
};

export default Index;