import React from "react";
import { Heading, HelpPageWrapper, HelpPageContainer } from "./Help.style";
import Accordion from "components/Accordion/Accordion";

const accor = [
  {
    id: 1,
    title: "Get Started",
    details: (
      <section className="max-w-5xl mx-auto py-10">
        <div>
          <div className="flex flex-row">
            <div className="hidden md:flex flex-col items-center">
              <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                <div className="text-3xl font-black text-gray-500">Step 1</div>
                <div className="text-gray-500 text-sm">SignUp</div>
              </div>
              <div className="h-full border-l-4 border-transparent">
                <div className="border-l-4 mr-4 h-full border-gray-300 border-dashed"></div>
              </div>
            </div>
            <div className="flex-auto border rounded  border-gray-300">
              <div className="flex md:flex-row flex-col items-center">
                <div className="flex-auto">
                  <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500">
                    <span className="font-black">Step 1</span> - SignUp
                  </div>
                  <div className="p-3 text-3xl text-gray-800 font">
                    Select your account Type and Sign Up
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start flex-row">
            <div className="border-t-4 border-r-4 border-transparent">
              <div className="w-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-b-4 rounded-bl-full"></div>
            </div>
            <div className="border-t-4 border-transparent flex-auto">
              <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
            </div>
            <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-t-4 rounded-tr-full"></div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="hidden md:flex flex-col items-center">
              <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                <div className="text-3xl font-black text-gray-500">Step 2</div>
                <div className="text-gray-500 text-sm">Profile</div>
              </div>
              <div className="h-full border-r-4 border-transparent">
                <div className="border-l-4 ml-4 h-full border-gray-300 border-dashed"></div>
              </div>
            </div>
            <div className="flex-auto border rounded  border-gray-300">
              <div className="flex md:flex-row flex-col items-center">
                <div className="flex-auto">
                  <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500">
                    <span className="font-black">Step 2</span> - Profile
                  </div>
                  <div className="p-3 text-3xl text-gray-800 font">
                    Complete Your profile and select your interests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    values: { number1: 7, number2: 2 },
  }
];
function Help() {
  return (
    <HelpPageWrapper>
      <HelpPageContainer>
        <Heading>F.A.Q</Heading>
        <Accordion items={accor} />
      </HelpPageContainer>
    </HelpPageWrapper>
  );
}
export default Help;
