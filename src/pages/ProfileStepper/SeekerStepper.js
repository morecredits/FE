import React from "react";
import * as Yup from "yup";
import * as schema from "common/yupFieldValidation";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import ProfileStepper from "./ProfileStepper";
import { useHistory } from "react-router-dom";
import { normalizeErrors, IsNotEmpty } from "helpers";
import UserContext from "contexts/user/user.provider";
import { maybe } from "misc";
import { showSeekerProfileNotification } from "utils";
import { TypedSeekerProfileMutation } from "containers/Authentication/mutations";
import ConstantsContext from "contexts/constants/constants.provider";
//import CoursesSearch from "components/CoursesSearch/CoursesSearch";
import {
  SEEKER_PROFILE_MUTATION,
  SEEKER_PROFILE_COMPLETION,
  SKILL_ITEM_CREATE,
  //AVATAR_UPDATE_MUTATION,
  //EDUCATION_ITEM_CREATE,
  //WORK_ITEM_CREATE,
  //SOCIAL_ITEM_CREATE,
} from "graphql/mutations";
//import { handleAvatarUpdate } from "utils";
import moment from "moment";

//const personaTitles = [
//  { label: "Student", value: "Student" },
//  { label: "Sir", value: "Sir" },
//  { label: "Ma'am", value: "Ma'am" },
//  { label: "Madam", value: "Madam" },
//  { label: "Mr", value: "Mr" },
//  { label: "Mrs", value: "Mrs" },
//  { label: "Ms", value: "Ms" },
//  { label: "Miss", value: "Miss" },
//];

//const GPA = [
//  { label: "A+    [% - 97-100,    scale - 4.0]", value: "A+" },
//  { label: "A     [% - 93-96,     scale - 4.0]", value: "A" },
//  { label: "A-    [% - 90-92,     scale - 3.7]", value: "A-" },
//  { label: "B+    [% - 87-89,     scale - 3.3]", value: "B+" },
//  { label: "B     [% - 83-86,     scale - 3.0]", value: "B" },
//  { label: "B-    [% - 80-82,     scale - 2.7]", value: "B-" },
//  { label: "C+    [% - 77-79,     scale - 2.3]", value: "C+" },
//  { label: "C     [% - 73-76,     scale - 2.0]", value: "C" },
//  { label: "C-    [% - 70-72,     scale - 1.7]", value: "C-" },
// { label: "D+    [% - 67-69,     scale - 1.3]", value: "D+" },
//  { label: "D     [% - 65-66,     scale - 1.0]", value: "D" },
//  { label: "E/F   [% - Below 65,  scale - 0.0]", value: "E/F" },
//];
//const socials = [
//  {
//    label: (
//      <div>
//        <i className="fa fa-facebook-square" /> facebook
//      </div>
//    ),
//    value: "https://www.facebook.com/",
//  },
//  {
//    label: (
//      <div>
//        <i className="fa fa-twitter-square" /> twitter
//      </div>
//    ),
//    value: "https://www.twitter.com/",
//  },
//  {
//    label: (
//      <div>
//        <i className="fa fa-instagram" /> instagram
//      </div>
//    ),
//    value: "https://www.instagram.com/",
//  },
//  {
//    label: (
//      <div>
//        <i className="fa fa-linkedin-square" /> linkedin
//      </div>
//    ),
//    value: "https://www.linkedin.com/",
//  },
//  {
//    label: (
//      <div>
//        <i className="fa fa-github-square" /> github
//      </div>
//    ),
//    value: "https://www.github.com/",
// },
// {
//    label: (
//      <div>
//        <i className="fa fa-tiktok" /> tiktok
//      </div>
//    ),
//    value: "https://www.tiktok.com/",
//  },
//];

const SeekerStepper = () => {
  const initValues = {};
  const history = useHistory();
  const alert = useAlert();
  const [initialValues, setInitialValues] = React.useState(initValues);
  const { setRefetchUser, userLoading, user, getUser, userData } =
    React.useContext(UserContext);
  const {
    seekerGender,
    seekerStatus,
    seekerNationality,
    educationLevel,
    institutions,
    industries,
    skills,
  } = React.useContext(ConstantsContext);
  // const [updateAvatar] = useMutation(AVATAR_UPDATE_MUTATION);

  const [updateSeekerProfile] = useMutation(SEEKER_PROFILE_COMPLETION, {
    onCompleted: (data) => {
      setRefetchUser((prev) => !prev);
    },
  });

  const [
    createSeeker,
    { data: seekerData, loading: seekerLoading, error: seekerError },
  ] = useMutation(SEEKER_PROFILE_MUTATION, {
    onCompleted: (data) => {
      // after this I've to send another req
      setRefetchUser((prev) => !prev);
    },
  });
  const [createSkills] = useMutation(SKILL_ITEM_CREATE, {
    onCompleted: (data) => {
      // after this I've to send another req
      updateSeekerProfile({
        variables: {
          id: user?.seeker?.profileCompletion?.id,
          experience: true,
          skills: true,
          education: true,
          settings: true,
          socials: true,
        },
      });
    },
  });

  const seekerCreateSubmit = (values) => {
    console.log("inafika", values);
    values.industries = values.industries.map((industry) => industry.value);
    values.nationality = values.nationality.value;
    values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD");

    console.log("all the seeker values", values);
    if (IsNotEmpty(values.industries)) {
      createSeeker({ variables: { ...values } });
    }
    return { seekerData, seekerLoading, seekerError };
  };

  const seekerUpdateSubmit = (values) => {
    console.log("inafika", values);
    if (IsNotEmpty(values.skills)) {
      for (let i = 0; i < values.skills.length; i++) {
        const element = values.skills[i];
        createSkills({
          variables: {
            name: element.label,
            proficiency: "Intermediate",
            level: "Intermediate",
            owner: user?.seeker?.id,
          },
        });
      }
    }
  };

  const seekerSteps = [
    {
      label: "Account Settings",
      description: `Help Us understand more about you.`,
      useFieldArray: false,
      mutation: seekerCreateSubmit,
      blankValues: {
        title: "",
        location: "",
        gender: "",
        status: "",
        mobile: "",
        industries: null,
        nationality: null,
        description: "",
        idNumber: 0,
        dateOfBirth: new Date(),
      },
      schema: Yup.object().shape({
        gender: schema.requiredString,
        status: schema.requiredString,
        mobile: schema.mobile,
        industries: Yup.array()
          .of(schema.select)
          .min(1, "Must have at least one entry"),
        nationality: schema.select,
        description: schema.requiredString,
        dateOfBirth: schema.date_of_birth,
      }),
      fields: [
        {
          name: "dateOfBirth",
          control: "date",
          description: "Date of Birth",
        },
        {
          name: "gender",
          description: "Gender",
          control: "mui-radio",
          options: seekerGender,
        },
        {
          name: "status",
          description: "Select Current Job Status",
          control: "mui-radio",
          options: seekerStatus,
        },
        {
          control: "phone",
          description: "Mobile Number",
          placeholder: "e.g. +254 722-123456",
          name: "mobile",
        },
        {
          control: "select",
          label: "Nationality",
          name: "nationality",
          hideButton: () => {},
          style: { margin: 0 },
          options: seekerNationality,
          description: "Choose your Nationality",
          defaultValue: { value: "", label: "Select Nationality" },
        },
        {
          control: "select",
          label: "Industry Interests",
          isMulti: true,
          name: "industries",
          hideButton: () => {},
          style: { margin: 0 },
          options: industries,
          description: "Choose your Industries",
        },
        {
          name: "description",
          description: "About Yourself",
          control: "textarea",
          rte: true,
          fullWidth: true,
        },
      ],
    },

    {
      label: "Skills",
      description: `Skills.`,
      mutation: seekerUpdateSubmit,
      blankValues: {
        skills: [],
      },
      schema: Yup.object({
        skills: Yup.array()
          .of(schema.select)
          .min(1, "Must have at least one entry"),
      }),
      fields: [
        {
          control: "select",
          label: "Skills",
          isMulti: true,
          name: "skills",
          hideButton: () => {},
          style: { margin: 0 },
          options: skills,
          description: "Choose your Skills",
        },
      ],
    },
  ];

  React.useEffect(() => {
    setInitialValues(initValues);
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seekerProfileCreate = (values, seekerCreate, setErrors) => {
    // const interests = values.interests.reduce((arr, b) => {
    //   arr.push(b.value);
    //   return arr;
    // }, []);
    const industries = values.industries.reduce((arr, b) => {
      arr.push(b.value);
      return arr;
    }, []);
    seekerCreate({
      variables: {
        institution: values.school.value,
        industries: industries,
        interests: [],
        skills: [],
        course: values.course.value,
      },
    }).then(({ data }) => {
      if (data) {
        if (data.seekerCreate) {
          history.push("/dashboard/billing");
          setRefetchUser();

          if (!data.seekerCreate.success) {
            setErrors(
              normalizeErrors(maybe(() => data.seekerCreate.errors, [])),
            );
          }
        }
      }
    });
  };
  if (
    !seekerGender ||
    !seekerStatus ||
    !seekerNationality ||
    !educationLevel ||
    !institutions ||
    !skills
  )
    return <div>To Load</div>;

  if (userLoading) return <>Loading...</>;

  return (
    <TypedSeekerProfileMutation
      onCompleted={(data, errors) =>
        showSeekerProfileNotification(data, errors, alert)
      }
    >
      {(seekerCreate, { loading }) => {
        function onSeekerProfileSubmit(values, { setErrors }) {
          if (IsNotEmpty(values.industries)) {
            seekerProfileCreate(values, seekerCreate, setErrors);
          }
        }
        return (
          // <FurtherInformation
          //   schoolOptions={schoolOptions}
          //   industries={industries}
          //   courses={courseOptions}
          //   loading={loading}
          //   onSeekerProfileSubmit={
          //     onSeekerProfileSubmit
          //   }
          //   initialValues={schoolInterestsInitialValues}
          //   alert={alert}
          // />

          <ProfileStepper
            onProfileInitialSubmit={onSeekerProfileSubmit}
            onProfileSubmit={onSeekerProfileSubmit}
            isEdit={userData?.me?.isSeeker && user?.seeker}
            setRefetchUser={setRefetchUser}
            steps={seekerSteps}
            initialValaues={initialValues}
            sets={userData?.me?.seeker?.profileCompletion}
          />
        );
      }}
    </TypedSeekerProfileMutation>
  );
};

export default SeekerStepper;
