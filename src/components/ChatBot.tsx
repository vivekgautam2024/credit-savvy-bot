import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, CreditCard, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  status?: 'eligible' | 'not-eligible' | 'pending' | 'info';
}

const eligibilityQuestions = [
  "What is your monthly income?",
  "Do you have any existing loans or credit cards?",
  "What is your employment status?",
  "How long have you been employed?",
  "What is your credit score (if known)?",
];

const quickReplies = [
  "Check loan eligibility",
  "Credit card options",
  "Required documents",
  "Interest rates",
  "Processing time",
];

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant for loan and credit card eligibility verification. How can I help you today?',
      timestamp: new Date(),
      status: 'info'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (content: string, type: 'user' | 'bot', status?: Message['status']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      status
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateEligibilityCheck = (userInput: string) => {
    const income = extractIncome(userInput);
    const hasExistingLoans = /loan|credit|debt|emi/i.test(userInput);
    const employed = /employed|job|work|salary/i.test(userInput);

    if (income > 30000 && employed && !hasExistingLoans) {
      return {
        eligible: true,
        message: `Great news! Based on your income of ₹${income.toLocaleString()}/month and employment status, you're eligible for:

🏦 **Personal Loan**: Up to ₹5,00,000 at 10.5% interest
💳 **Credit Card**: Premium card with ₹2,00,000 limit
📈 **Home Loan**: Up to ₹50,00,000 at 8.5% interest

Would you like to proceed with the application?`,
        status: 'eligible' as const
      };
    } else if (income > 20000) {
      return {
        eligible: true,
        message: `You're eligible for basic financial products:

💳 **Credit Card**: Standard card with ₹50,000 limit
🏦 **Personal Loan**: Up to ₹2,00,000 at 12.5% interest

To improve your eligibility, consider increasing your income or clearing existing debts.`,
        status: 'eligible' as const
      };
    } else {
      return {
        eligible: false,
        message: `Unfortunately, you don't meet the minimum eligibility criteria at this time. To improve your chances:

• Increase your monthly income to ₹20,000+
• Maintain steady employment for 6+ months
• Clear existing debts to improve your credit profile

Would you like tips on improving your credit score?`,
        status: 'not-eligible' as const
      };
    }
  };

  const extractIncome = (text: string): number => {
    const match = text.match(/(\d+(?:,\d+)*(?:\.\d+)?)/);
    return match ? parseInt(match[1].replace(/,/g, '')) : 25000; // Default if not found
  };

  const generateBotResponse = (userMessage: string): { content: string; status?: Message['status'] } => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('eligibility') || lowerMessage.includes('eligible')) {
      const result = simulateEligibilityCheck(userMessage);
      return { content: result.message, status: result.status };
    }

    if (lowerMessage.includes('documents') || lowerMessage.includes('required')) {
      return {
        content: `Here are the required documents for loan/credit card application:

📄 **Identity Proof**: Aadhar Card, PAN Card, Passport
💼 **Income Proof**: 3 months salary slips, Form 16
🏦 **Bank Statements**: Last 6 months statements
🏠 **Address Proof**: Utility bills, rental agreement
📊 **Employment Proof**: Employment letter, offer letter

All documents should be recent and clearly legible.`,
        status: 'info'
      };
    }

    if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
      return {
        content: `Current interest rates (subject to eligibility):

🏦 **Personal Loan**: 10.5% - 15.0% per annum
💳 **Credit Card**: 3.5% per month (42% per annum)
🏠 **Home Loan**: 8.5% - 9.5% per annum
🚗 **Car Loan**: 9.0% - 12.0% per annum

Rates may vary based on your credit score and income profile.`,
        status: 'info'
      };
    }

    if (lowerMessage.includes('time') || lowerMessage.includes('processing')) {
      return {
        content: `Processing timelines:

⚡ **Credit Card**: 3-7 working days
🏦 **Personal Loan**: 2-5 working days
🏠 **Home Loan**: 15-30 working days
🚗 **Car Loan**: 5-10 working days

Express processing available for pre-approved customers!`,
        status: 'info'
      };
    }

    if (lowerMessage.includes('income') || lowerMessage.includes('salary')) {
      return {
        content: `Thank you for sharing your income details. To provide accurate eligibility, I'll need a few more details:

• What is your employment type? (Salaried/Self-employed)
• How long have you been employed?
• Do you have any existing loans or EMIs?
• What city are you based in?

This helps me calculate your exact eligibility!`,
        status: 'pending'
      };
    }

    // Default response
    return {
      content: `I can help you with:

✅ Loan eligibility checking
✅ Credit card recommendations  
✅ Document requirements
✅ Interest rates and terms
✅ Application process guidance

Feel free to ask about any financial product or share your income details for personalized eligibility!`,
      status: 'info'
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, 'user');
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const response = generateBotResponse(inputValue);
      addMessage(response.content, 'bot', response.status);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const getStatusIcon = (status?: Message['status']) => {
    switch (status) {
      case 'eligible':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'not-eligible':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <TrendingUp className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status?: Message['status']) => {
    switch (status) {
      case 'eligible':
        return <Badge variant="default" className="bg-gradient-success">Eligible</Badge>;
      case 'not-eligible':
        return <Badge variant="destructive">Not Eligible</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Review Required</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-elevated bg-gradient-card border-0">
      <CardHeader className="pb-4 border-b bg-gradient-primary text-primary-foreground">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Eligibility Assistant</CardTitle>
            <p className="text-sm text-primary-foreground/80">
              Get instant loan & credit card eligibility
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] p-3 rounded-lg space-y-2 animate-slide-in
                    ${message.type === 'user'
                      ? 'bg-gradient-primary text-primary-foreground ml-4'
                      : 'bg-muted mr-4'
                    }
                  `}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-4 w-4 text-primary-foreground mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(message.status)}
                          {getStatusBadge(message.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg mr-4 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="p-4 border-t bg-muted/50">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-xs"
              >
                {reply}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about eligibility, documents, rates..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary hover:bg-gradient-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};