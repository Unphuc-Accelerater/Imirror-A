import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ToastContainer } from "./components/UI/Toast";

// Import screens
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
import { FeedbackFormContainer } from "./components/FeedbackForm/FeedbackFormContainer";

// Import route components
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
import { Messages } from "./screens/Messages/Messages";

// Import feedback forms
import { PersonalGrowthForm } from "./routes/FeedbackForms/screens/PersonalGrowthForm";
import { EmotionalIntelligenceForm } from "./routes/FeedbackForms/screens/EmotionalIntelligenceForm";
import { RelationshipForm } from "./routes/FeedbackForms/screens/RelationshipForm";
import { MentalHealthForm } from "./routes/FeedbackForms/screens/MentalHealthForm";
import { CommunicationForm } from "./routes/FeedbackForms/screens/CommunicationForm";
import { ValuesForm } from "./routes/FeedbackForms/screens/ValuesForm";
import { ConflictResolutionForm } from "./routes/FeedbackForms/screens/ConflictResolutionForm";
import { RomanticForm } from "./routes/FeedbackForms/screens/RomanticForm";
import { FeedbackFormViewer } from "./routes/FeedbackForms/screens/FeedbackFormViewer";

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
  {
    path: "/feedback/form/:formId",
    element: <FeedbackFormViewer />,
  },
  {
    path: "/dashboard/request-feedback/:emotion",
    element: <FeedbackFormContainer />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
]);

export const App = () => {
  useEffect(() => {
    // Set up global styles for mobile app
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overscrollBehavior = 'none';
    document.body.style.fontFamily = 'Inter, system-ui, -apple-system, sans-serif';
    
    // Add mobile viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
    
    // Add mobile-specific styles
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea, button, select {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      .safe-area-pt {
        padding-top: env(safe-area-inset-top);
      }
      
      .safe-area-pb {
        padding-bottom: env(safe-area-inset-bottom);
      }
      
      @media (max-width: 768px) {
        body {
          font-size: 16px;
        }
      }
      
      /* Ensure all buttons are visible */
      button {
        min-height: 44px;
        min-width: 44px;
        position: relative;
        z-index: 1;
      }
      
      /* Back button visibility */
      .back-button {
        background: rgba(255, 255, 255, 0.9) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
};