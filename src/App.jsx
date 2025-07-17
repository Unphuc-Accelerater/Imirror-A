import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { DivWrapper } from "./screens/DivWrapper";
import { Enterotp } from "./screens/Enterotp";
import { Getstarted } from "./screens/Getstarted";
import { GetstartedScreen } from "./screens/GetstartedScreen";
import { Journals } from "./screens/Journals";
import { LoginSignup } from "./screens/LoginSignup";
import { RequestFeedback } from "./screens/RequestFeedback";
import { SetupProfile } from "./screens/SetupProfile";
import { SplashScreen } from "./screens/SplashScreen";
import { SelfAssessement } from "./routes/SelfAssessement/screens/SelfAssessement";
import { Settings } from "./routes/Settings/screens/Settings";
import { MembershipPage } from "./routes/MembershipPage/screens/MembershipPage";
import { EditProfile } from "./routes/EditProfile/screens/EditProfile";
import { ReferAFriend } from "./routes/ReferAFriend/screens/ReferAFriend";
import { Notification } from "./routes/Notification/screens/Notification";
import { Coaches } from "./routes/Coaches/screens/Coaches";
import { DoctorProfile } from "./routes/Coaches/screens/DoctorProfile";
import { DoctorSessionBooking } from "./routes/Coaches/screens/DoctorSessionBooking";
import { PaymentSelection } from "./routes/Payment/screens/PaymentSelection";
import { PaymentSuccess } from "./routes/Payment/screens/PaymentSuccess";
import { WriteReview, ThankYouConfirmation } from "./routes/Review";
import { HelpFAQ } from "./routes/HelpFAQ/screens/HelpFAQ";
import { PersonalGrowthForm } from "./routes/FeedbackForms/screens/PersonalGrowthForm";
import { EmotionalIntelligenceForm } from "./routes/FeedbackForms/screens/EmotionalIntelligenceForm";
import { RelationshipForm } from "./routes/FeedbackForms/screens/RelationshipForm";
import { MentalHealthForm } from "./routes/FeedbackForms/screens/MentalHealthForm";
import { CommunicationForm } from "./routes/FeedbackForms/screens/CommunicationForm";
import { ValuesForm } from "./routes/FeedbackForms/screens/ValuesForm";
import { ConflictResolutionForm } from "./routes/FeedbackForms/screens/ConflictResolutionForm";
import { RomanticForm } from "./routes/FeedbackForms/screens/RomanticForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/splash-screen",
    element: <SplashScreen />,
  },
  {
    path: "/journals",
    element: <Journals />,
  },
  {
    path: "/setupprofile",
    element: <SetupProfile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/getstarted3",
    element: <Getstarted />,
  },
  {
    path: "/getstarted1",
    element: <GetstartedScreen />,
  },
  {
    path: "/loginu38signup",
    element: <LoginSignup />,
  },
  {
    path: "/getstarted2",
    element: <DivWrapper />,
  },
  {
    path: "/request-feedback",
    element: <RequestFeedback />,
  },
  {
    path: "/enterotp",
    element: <Enterotp />,
  },
  {
    path: "/self-assessment",
    element: <SelfAssessement />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/membership",
    element: <MembershipPage />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/refer-a-friend",
    element: <ReferAFriend />,
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
  {
    path: "/coaches",
    element: <Coaches />,
  },
  {
    path: "/coaches/sarah-chen",
    element: <DoctorProfile />,
  },
  {
    path: "/coaches/sarah-chen/book-session",
    element: <DoctorSessionBooking />,
  },
  {
    path: "/payment",
    element: <PaymentSelection />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/write-review",
    element: <WriteReview />,
  },
  {
    path: "/thank-you-review",
    element: <ThankYouConfirmation />,
  },
  {
    path: "/help-faq",
    element: <HelpFAQ />,
  },
  {
    path: "/feedback/personal-growth",
    element: <PersonalGrowthForm />,
  },
  {
    path: "/feedback/emotional-intelligence",
    element: <EmotionalIntelligenceForm />,
  },
  {
    path: "/feedback/relationship",
    element: <RelationshipForm />,
  },
  {
    path: "/feedback/mental-health",
    element: <MentalHealthForm />,
  },
  {
    path: "/feedback/communication",
    element: <CommunicationForm />,
  },
  {
    path: "/feedback/values",
    element: <ValuesForm />,
  },
  {
    path: "/feedback/conflict-resolution",
    element: <ConflictResolutionForm />,
  },
  {
    path: "/feedback/romantic",
    element: <RomanticForm />,
  },
]);

export const App = () => {
  // Set up global styles for the app
  useEffect(() => {
    // Add smooth scrolling to the entire app
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent overscroll/bounce effect on mobile
    document.body.style.overscrollBehavior = 'none';
    
    // Set default font
    document.body.style.fontFamily = 'Inter, sans-serif';
  }, []);

  return <RouterProvider router={router} />;
};
