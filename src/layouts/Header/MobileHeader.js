import React from "react";
import { Link } from "react-router-dom";
// import { openModal, closeModal } from "@redq/reuse-modal";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import MobileDrawer from "./MobileDrawer";
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  // SearchWrapper,
  // SearchModalWrapper,
  // SearchModalClose,
} from "./Header.style";
// import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { HeaderContext } from "contexts/header/header.context";

// import { SearchIcon, LongArrowLeft } from "components/AllSvgIcon";
// import LogoImage from "image/logo.svg";
import { isCategoryPage } from "../is-home-page";
import useDimensions from "helpers/useComponentSize";
// import Logoimage from "image/thedb.png";
// import InvertedLogoimage from "image/db.png";
import styled from "styled-components";

import rotaryLogo from "image/rotary-logo-color-2019-simplified.svg";
import rotaractLogo from "image/rotaract.png";

export const Logo = styled.div`
  margin-right: auto;

  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;
export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  height: inherit;
  max-width: 150px;
  max-height: 36px;
`;

// const SearchModal = ({ state, pathname, handleSearch }) => {
//   const history = useHistory();
//   const [text, setText] = useState(state.text || "");
//   const handleSearchInput = (text) => {
//     setText(text);
//   };
//   const { page, ...urlState } = state;

//   const handleClickSearchButton = () => {
//     handleSearch(text);
//     history.push({
//       pathname: pathname,
//       query: {
//         ...urlState,
//         text,
//       },
//     });
//     closeModal();
//   };
//   return (
//     <SearchModalWrapper>
//       <SearchModalClose type="submit" onClick={() => closeModal()}>
//         <LongArrowLeft />
//       </SearchModalClose>
//       <SearchBox
//         className="header-modal-search"
//         bordered={false}
//         inputStyle={{ height: 35 }}
//         buttonText=""
//         placeholder="Search"
//         handleSearch={handleSearchInput}
//         value={text}
//         onClick={handleClickSearchButton}
//         pathname={pathname}
//       />
//     </SearchModalWrapper>
//   );
// };

const MobileHeader = ({ className, pathname, isSticky }) => {
  const { state } = React.useContext(SearchContext);
  // const { state, dispatch } = useContext(SearchContext);

  const [mobileHeaderRef, dimensions] = useDimensions();
  const { headerDispatch } = React.useContext(HeaderContext);

  const headerHeight = dimensions.height;

  React.useEffect(() => {
    headerDispatch({
      type: "GET_MOBILE_HEIGHT",
      payload: {
        ...state,
        mobileHeight: headerHeight,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerHeight]);

  // const handleSearch = (text) => {
  //   dispatch({
  //     type: "UPDATE",
  //     payload: {
  //       ...state,
  //       text,
  //     },
  //   });
  // };
  // const handleSearchModal = () => {
  //   openModal({
  //     show: true,
  //     config: {
  //       enableResizing: false,
  //       disableDragging: true,
  //       className: "search-modal-mobile",
  //       width: "100%",
  //       height: "100%",
  //     },
  //     closeOnClickOutside: false,
  //     component: SearchModal,
  //     componentProps: { state, pathname, handleSearch },
  //     closeComponent: () => <div />,
  //   });
  // };

  const isHomePage =
    window.location.host.split(".")[0] === "kaziconnect9212"
      ? false
      : isCategoryPage(pathname);

  const isKaziconnectPage =
    window.location.host.split(".")[0] === "kaziconnect9212" ? true : false;

  return (
    <DrawerProvider>
      <MobileHeaderWrapper>
        <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
          <DrawerWrapper>
            <MobileDrawer isSticky={isSticky} />
          </DrawerWrapper>

          <LogoWrapper>
            <Link to="/">
              {isKaziconnectPage ? (
                <div style={{ display: "flex" }}>
                  <LogoImage src={rotaryLogo} alt="Rotary" />
                  <LogoImage src={rotaractLogo} alt="Rotaract" />
                </div>
              ) : (
                <div
                  className={`flex items-center font-medium text-lg ${
                    isHomePage
                      ? isSticky
                        ? "text-blue-800"
                        : "text-white"
                      : "text-blue-800"
                  } `}
                >
                  {/* <LogoImage
                src={
                  isHomePage
                    ? isSticky
                      ? Logoimage
                      : InvertedLogoimage
                    : Logoimage
                }
                alt="TheDB"
              /> */}
                  TheDatabase
                </div>
              )}
            </Link>
          </LogoWrapper>

          {/* {isHomePage ? (
            <SearchWrapper
              onClick={handleSearchModal}
              className="searchIconWrapper"
            >
              <SearchIcon />
            </SearchWrapper>
          ) : null} */}
        </MobileHeaderInnerWrapper>
      </MobileHeaderWrapper>
    </DrawerProvider>
  );
};

export default MobileHeader;
