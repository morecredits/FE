import "./i18n";

import React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { useDarkMode } from "helpers/useDarkMode";
import { GlobalStyle } from "styles/global-styles";
import { lightTheme, darkTheme } from "styles/theme";
import { Provider as AlertProvider } from "react-alert";
import { useHistory, useLocation } from "react-router-dom";
import { ReactHooksWrapper, setHook } from "hooks";
import { NotificationTemplate } from "components/NotificationTemplate";
import { useDeviceType } from "helpers/useDeviceType";
import { AuthProvider } from "contexts/auth/auth.provider";
import { VacancyProvider } from "contexts/vacancies/vacancies.provider";
import { ConstantsProvider } from "contexts/constants/constants.provider";
import { StickyProvider } from "contexts/app/app.provider";
import { SearchProvider } from "contexts/search/search.provider";
import { HeaderProvider } from "contexts/header/header.provider";
import { ServiceWorkerProvider } from "contexts/ServiceWorkerProvider";
import { DatabaseProvider } from "contexts/database/database.provider";
import { ModalProvider } from "contexts/modal/modal.provider";
import { ResumeProvider } from "contexts/resume/resume.provider";
import { SettingsProvider } from "contexts/settings/settings.provider";
import { StorageProvider } from "contexts/storage/storage.provider";
import { UserProvider } from "contexts/user/user.provider";
import { SidebarProvider } from "contexts/sidebar/use-sidebar";
import BaseRouter from "routers/router";
import { useRouterQuery } from "helpers/useRouterQuery";
import { serviceWorkerTimeout } from "constants/constants";
import { withApollo } from "helpers/apollo";
import { MuiThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { SEO } from "components/seo";
import ScrollToTop from "helpers/scrollToTop";

// External CSS import here
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-phone-input-2/lib/style.css";
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "@redq/reuse-modal/lib/index.css";
import { GoogleOAuthProvider } from "@GoogleLogin";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

const MUItheme = createTheme({
  typography: {
    fontWeightRegular: 500,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

function App() {
  const queryParams = useRouterQuery();
  const [theme, componentMounted] = useDarkMode();
  const userAgent = navigator.userAgent;
  const deviceType = useDeviceType(userAgent);
  const themeMode = theme === "Light" ? lightTheme : darkTheme;
  if (!componentMounted) {
    return <div />;
  }
  setHook("historyHook", useHistory).setHook("locationHook", useLocation);

  const query = queryParams.get("text") ? queryParams.get("text") : "";
  const notificationConfig = {
    timeout: 5000,
    position: "top right",
    containerStyle: {
      top: 0,
    },
  };

  return (
    <>
      <SEO
        title={`TheDatabase Kenya`}
        description={`From Gigs to Internships to Jobs and Volunteering. students can gerrit, employers can get it, workers can gerrit. EVERYBODY can gerrit! TheDatabase, Jobs Need People!`}
        industry={"All Industries"}
        location={"Kenya"}
        canonical={window.location.href}
        link={window.location.href}
        company={"ADELIMA THEDATABASE KENYA"}
      />
      <SettingsProvider>
        <OriginalThemeProvider theme={themeMode}>
          <MuiThemeProvider theme={MUItheme}>
            <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
              <SidebarProvider>
                <ConstantsProvider>
                  <SearchProvider query={query}>
                    <HeaderProvider>
                      <AuthProvider>
                        <UserProvider>
                          <GoogleOAuthProvider clientId="948225711672-3553sbnjkq2kcuma94grhd4hl7935ahp.apps.googleusercontent.com">
                            <VacancyProvider>
                              <ModalProvider>
                                <DatabaseProvider>
                                  <ResumeProvider>
                                    <StickyProvider>
                                      <AlertProvider
                                        template={NotificationTemplate}
                                        {...notificationConfig}
                                      >
                                        <StorageProvider>
                                          <ScrollToTop>
                                            <BaseRouter
                                              deviceType={deviceType}
                                            />
                                          </ScrollToTop>
                                        </StorageProvider>
                                      </AlertProvider>
                                    </StickyProvider>
                                  </ResumeProvider>
                                </DatabaseProvider>
                              </ModalProvider>
                            </VacancyProvider>
                          </GoogleOAuthProvider>
                        </UserProvider>
                      </AuthProvider>
                    </HeaderProvider>
                    <GlobalStyle />
                  </SearchProvider>
                </ConstantsProvider>
              </SidebarProvider>
              <ReactHooksWrapper />
            </ServiceWorkerProvider>
          </MuiThemeProvider>
        </OriginalThemeProvider>
      </SettingsProvider>
    </>
  );
}
export default withApollo(App);
