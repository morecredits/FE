import React from "react";

// import { useSidebar } from "context/sidebar/use-sidebar";
import { toast } from "react-toastify";

// import Slide from "containers/Slide/Slide";
// import EditPostCompany from "./EditPostCompany";

// import { makeSecretKey } from "utils";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import {
  GET_MY_VACANCIES,
  JobJobType,
  JobYearsOfExp,
  JobMinQualification,
  JobPayRate,
} from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { cleanSelectData } from "helpers";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { getDBIdFromGraphqlId } from "core/utils";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedVacanciesQuery = TypedQuery(GET_MY_VACANCIES);
export const TypedJobJobTypeQuery = TypedQuery(JobJobType);
export const TypedJobYearsOfExpQuery = TypedQuery(JobYearsOfExp);
export const TypedJobMinQualificationQuery = TypedQuery(JobMinQualification);
export const TypedJobPayRateQuery = TypedQuery(JobPayRate);

const ManageVacancies = ({ deviceType }) => {
  const history = useHistory();
  //const [checkedId, setCheckedId] = React.useState([]);
  //const [checked, setChecked] = React.useState(false);
  // const [editData, setEditData] = React.useState({});
  //const [filename, setFileName] = React.useState("makeSecretKey(10)");
  // const { isOpen, toggleSidebar } = useSidebar();

  let myVacancies;
  //let jobTypeData = [];
  // let qualificationData = [];
  //let payRateData;
  // let yearsData = [];

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [myVacancies]);

  const getVacancyUrl = (d) => {
    return `${window.location.origin}/vacancies/${getDBIdFromGraphqlId(
      d.id,
      "Vacancy",
    )}`;
  };

  const handleEdit = (d) => {
    // toggleSidebar();
    toast.info(`Edit ${d.title}`);
    history.push(
      `/dashboard/vacancies/edit-job/${getDBIdFromGraphqlId(d.id, "Vacancy")}`,
    );
    // setEditData(d);
  };
  /*const handleBulkGenerate = () => {
    // toast.info(`Generated ${checkedId.length} items on CSV`);
    toast.info(`Feature coming soon`);
  };
  const handleBulkDelete = () => {
    // toast.info(`To Delete ${checkedId.length} items`);
    toast.info(`Feature coming soon`);
  };*/
  const handleView = (d) => {
    // history.push(`/application/${d.id}/`);
    // history.push(`/vacancies/${getDBIdFromGraphqlId(d.id, "Vacancy")}`);
    if (typeof window !== `undefined`) {
      window && window.open(getVacancyUrl(d));
    }
    toast.info(`Redirecting ...`);
  };

  /*function onAllCheck(event) {
    if (!event.checked) {
      const idx =
        myVacancies && myVacancies.map((category) => parseInt(category.id));
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.checked);
  }
  function handleCheckbox(event) {
    const { id } = event;
    if (!checkedId.includes(id)) {
      setCheckedId((prevState) => [...prevState, id]);
    } else {
      setChecked(false);
      setCheckedId((prevState) => prevState.filter((id) => id !== event.id));
    }
  }
  // Input onChange handler
  const handleOnChange = (e) => {
    let currentValue = e.target.value;
    setFileName(currentValue);
  };*/

  const tablePage = (props) => {
    console.log("myvacancies data", props.data.myVacancies);
    const vacanciesData = props.data.myVacancies;

    const columns = [
      {
        field: "jobtitle",
        headerName: "Job Title",
        width: 200,
      },
      {
        field: "department",
        headerName: "Department",
        width: 150,
      },
      {
        field: "salary",
        headerName: "Salary",
        width: 120,
      },
      {
        field: "closingdate",
        headerName: "Closing date",
        width: 120,
      },
      {
        field: "positions",
        headerName: "Positions",
        width: 100,
      },
      {
        field: "applications",
        headerName: "Applications",
        width: 100,
      },
      {
        field: "type",
        headerName: "type",
        width: 100,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 120,
        renderCell: (params) => (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => handleView(params.value)}
            >
              View
            </Button>
            <IconButton size="small" onClick={() => handleEdit(params.value)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
    ];

    function createData(
      id,
      jobtitle,
      department,
      salary,
      closingdate,
      positions,
      applications,
      type,
      actions,
    ) {
      return {
        id,
        jobtitle,
        department,
        salary,
        closingdate,
        positions,
        applications,
        type,
        actions,
      };
    }

    const rows = vacanciesData.map((row) =>
      createData(
        row.id,
        row.title,
        row.industry.name,
        `${row.salary}/${row.payRate.toLowerCase()}`,
        moment(row.closingDate).format("YYYY-MM-DD "),
        row.positions,
        row.appliedCount,
        row.jobType,
        row,
      ),
    );
    return (
      <div style={{ display: "block", alignItems: "center" }}>
        <h2 className="logo-header">Job Listing</h2>
        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            components={{
              Toolbar: GridToolbar,
            }}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ backgroundColor: "#fff", p: 1, borderRaduis: 4 }}
          />
        </Box>
      </div>
    );
  };
  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedVacanciesQuery>
          {(vacanciesList) => {
            if (vacanciesList.loading) {
              return <Loader />;
            }
            if (vacanciesList.data) {
              myVacancies = vacanciesList.data.myVacancies;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "Vacancies Page",
                  title: "Vacancies Page",
                }}
              >
                <TypedJobJobTypeQuery>
                  {(jobData) => {
                    if (jobData.loading) return <div />;

                    //if (jobData.data) {
                    //  jobTypeData = cleanSelectData(
                    //    jobData.data.__type.enumValues,
                    //  );
                    //}
                    return (
                      <TypedJobMinQualificationQuery>
                        {(qualificationData) => {
                          if (qualificationData.loading) return <div />;

                          if (qualificationData.data) {
                            qualificationData = cleanSelectData(
                              qualificationData.data.__type.enumValues,
                            );
                          }
                          return (
                            <TypedJobPayRateQuery>
                              {(rateData) => {
                                if (rateData.loading) return <div />;

                                //if (rateData.data) {
                                //  payRateData = cleanSelectData(
                                //    rateData.data.__type.enumValues,
                                //  );
                                //}
                                return (
                                  <TypedJobYearsOfExpQuery>
                                    {(yearsData) => {
                                      if (yearsData.loading) return <div />;

                                      if (yearsData.data) {
                                        yearsData = cleanSelectData(
                                          yearsData.data.__type.enumValues,
                                        );
                                      }
                                      return tablePage(vacanciesList);
                                    }}
                                  </TypedJobYearsOfExpQuery>
                                );
                              }}
                            </TypedJobPayRateQuery>
                          );
                        }}
                      </TypedJobMinQualificationQuery>
                    );
                  }}
                </TypedJobJobTypeQuery>
              </MetaWrapper>
            );
          }}
        </TypedVacanciesQuery>
      )}
    </NetworkStatus>
  );
};

export default ManageVacancies;
