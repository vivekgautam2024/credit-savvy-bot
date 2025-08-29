import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/FileUpload";
import { CheckCircle2, Upload, User, DollarSign, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  aadharNumber: string;
  panNumber: string;
  annualIncome: string;
  monthlyDebt: string;
  employmentStatus: string;
  mobileNumber: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
}

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Financial Information", icon: DollarSign },
  { id: 3, title: "Contact Information", icon: Phone },
  { id: 4, title: "Document Upload", icon: Upload },
];

export const CreditVerificationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [documents, setDocuments] = useState({
    aadharCard: null as File | null,
    panCard: null as File | null,
    salarySlips: null as File | null,
    bankStatement: null as File | null,
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const { toast } = useToast();

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    // Here you would typically send data to your Flask backend
    console.log("Form Data:", data);
    console.log("Documents:", documents);
    
    toast({
      title: "Application Submitted Successfully!",
      description: "Your credit verification request has been submitted. You'll receive updates via email.",
    });
  };

  const handleDocumentUpload = (documentType: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                <Input
                  id="aadharNumber"
                  placeholder="XXXX XXXX XXXX"
                  maxLength={12}
                  {...register("aadharNumber", { 
                    required: "Aadhar number is required",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Please enter a valid 12-digit Aadhar number"
                    }
                  })}
                />
                {errors.aadharNumber && (
                  <p className="text-sm text-destructive">{errors.aadharNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number *</Label>
                <Input
                  id="panNumber"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  style={{ textTransform: 'uppercase' }}
                  {...register("panNumber", { 
                    required: "PAN number is required",
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Please enter a valid PAN number"
                    }
                  })}
                />
                {errors.panNumber && (
                  <p className="text-sm text-destructive">{errors.panNumber.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income (₹) *</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="Enter your annual income"
                  {...register("annualIncome", { required: "Annual income is required" })}
                />
                {errors.annualIncome && (
                  <p className="text-sm text-destructive">{errors.annualIncome.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyDebt">Existing Monthly Debt Payments (₹) *</Label>
                <Input
                  id="monthlyDebt"
                  type="number"
                  placeholder="Enter monthly debt payments"
                  {...register("monthlyDebt", { required: "Monthly debt payments are required" })}
                />
                {errors.monthlyDebt && (
                  <p className="text-sm text-destructive">{errors.monthlyDebt.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed (Full-time)</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  {...register("mobileNumber", { required: "Mobile number is required" })}
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-destructive">{errors.mobileNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address *</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("emailAddress", { required: "Email address is required" })}
                />
                {errors.emailAddress && (
                  <p className="text-sm text-destructive">{errors.emailAddress.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="streetAddress">Street Address *</Label>
                <Textarea
                  id="streetAddress"
                  placeholder="Enter your street address"
                  {...register("streetAddress", { required: "Street address is required" })}
                />
                {errors.streetAddress && (
                  <p className="text-sm text-destructive">{errors.streetAddress.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  {...register("state", { required: "State is required" })}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinCode">Pin Code *</Label>
                <Input
                  id="pinCode"
                  placeholder="Enter your pin code"
                  maxLength={6}
                  {...register("pinCode", { required: "Pin code is required" })}
                />
                {errors.pinCode && (
                  <p className="text-sm text-destructive">{errors.pinCode.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Aadhar Card *"
                description="Supports: image/*, .pdf"
                onFileUpload={(file) => handleDocumentUpload('aadharCard', file)}
                file={documents.aadharCard}
              />
              
              <FileUpload
                label="PAN Card *"
                description="Supports: image/*, .pdf"
                onFileUpload={(file) => handleDocumentUpload('panCard', file)}
                file={documents.panCard}
              />
              
              <FileUpload
                label="3 Month Salary Slips *"
                description="Supports: .pdf, .doc, .docx, image/*"
                onFileUpload={(file) => handleDocumentUpload('salarySlips', file)}
                file={documents.salarySlips}
              />
              
              <FileUpload
                label="6 Month Bank Statement *"
                description="Supports: .pdf, .doc, .docx"
                onFileUpload={(file) => handleDocumentUpload('bankStatement', file)}
                file={documents.bankStatement}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-elevated bg-gradient-card border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Credit Verification Portal
          </CardTitle>
          <CardDescription className="text-lg">
            Secure and comprehensive credit verification process. Fill in your details and upload required documents to proceed.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-2">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-gradient-success border-success text-success-foreground' 
                        : isCurrent 
                        ? 'bg-gradient-primary border-primary text-primary-foreground animate-glow' 
                        : 'border-muted bg-muted text-muted-foreground'
                      }
                    `}>
                      {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className="text-center">
                      <Badge variant={isCompleted ? "default" : isCurrent ? "default" : "secondary"}>
                        Step {step.id}
                      </Badge>
                      <p className="text-sm font-medium text-foreground mt-1">{step.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Please provide your basic personal details for verification"}
                  {currentStep === 2 && "Provide your employment and financial details"}
                  {currentStep === 3 && "Provide your contact details and address"}
                  {currentStep === 4 && "Please upload the following documents for verification"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="min-w-[120px]"
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="min-w-[120px] bg-gradient-primary hover:bg-gradient-primary/90"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-w-[120px] bg-gradient-success hover:bg-gradient-success/90"
                >
                  Submit Verification
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};