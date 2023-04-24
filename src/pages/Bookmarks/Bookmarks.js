import React from "react";
import { useAlert } from "react-alert";
// import { useSidebar } from "context/sidebar/use-sidebar";
import { toast } from "react-toastify";

// import Slide from "containers/Slide/Slide";
// import EditPostCompany from "./EditPostCompany";

// import { makeSecretKey } from "utils";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { BOOKMARKED_JOBS } from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { showNotification } from "helpers";
import { AuthContext } from "contexts/auth/auth.context";
import moment from "moment";
import { getDBIdFromGraphqlId } from "utils";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedBookmarksQuery = TypedQuery(BOOKMARKED_JOBS);

const Bookmarks = ({ deviceType }) => {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  //const [checkedId, setCheckedId] = React.useState([]);
  //const [checked, setChecked] = React.useState(false);
  // const [editData, setEditData] = React.useState({});
  //const [filename, setFileName] = React.useState("makeSecretKey(10)");
  // const { isOpen, toggleSidebar } = useSidebar();
  //console.log(filename);
  //console.log(checkedId);
  let bookmarks;

  const alert = useAlert();

  const skipResetRef = React.useRef(false);

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [bookmarks]);
  const getVacancyUrl = (d) => {
    if (profile.isSeeker) {
      return `${window.location.origin}/vacancies/${getDBIdFromGraphqlId(
        d?.job?.id,
        "Vacancy",
      )}`;
    }
    if (profile.isEmployer) {
      return `${window.location.origin}/p/${getDBIdFromGraphqlId(
        d?.user?.id,
        "User",
      )}`;
    }
  };

  /* const handleBulkGenerate = () => {
    toast.info(`to generate ${checkedId.length} items on CSV`);
  };
  const handleBulkDelete = () => {
    toast.info(`To Delete ${checkedId.length} items`);
  };*/

  const handleView = (d) => {
    // history.push(`/application/${d.id}/`);
    console.log("I was called");
    if (typeof window !== `undefined`) {
      window && window.open(getVacancyUrl(d));
      console.log("If criteria met");
    }
    toast.info(`Redirecting ...`);
    console.log("We got to the end of this funct");
  };

  /*function onAllCheck(event) {
    if (!event.checked) {
      const idx =
        bookmarks && bookmarks.map((category) => parseInt(category.id));
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
  }*/

  // Input onChange handler
  /*const handleOnChange = (e) => {
    let currentValue = e.target.value;
    setFileName(currentValue);
  };*/

  const tablePage = (props) => {
    console.log("bookmarks data", props.data.bookmarkedJobs);
    const bookmarksData = props.data.bookmarkedJobs;

    const columns = [
      {
        field: "jobtitle",
        headerName: "Job Title",
        width: 250,
      },
      {
        field: "datesaved",
        headerName: "Date saved",
        width: 120,
      },
      {
        field: "savedby",
        headerName:
          profile && profile.isSeeker
            ? "Employer"
            : profile.isEmployer
            ? "Saved By"
            : null,
        width: 250,
      },
      {
        field: "closingdate",
        headerName: "Closing date",

        width: 120,
      },
      {
        field: "saved",
        headerName: "Saved",
        sortable: false,
        width: 100,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 100,
        renderCell: (params) => (
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => handleView(params.value)}
          >
            View
          </Button>
        ),
      },
    ];

    function createData(
      id,
      jobtitle,
      datesaved,
      savedby,
      closingdate,
      saved,
      actions,
    ) {
      return {
        id,
        jobtitle,
        datesaved,
        savedby,
        closingdate,
        saved,
        actions,
      };
    }

    const rows = bookmarksData.map((row) =>
      createData(
        row.id,
        row.job.title,
        moment(row.createdAt).format("YYYY-MM-DD "),
        profile && row
          ? profile.isSeeker
            ? row?.job?.creator?.fullName
            : profile.isEmployer
            ? row?.user?.email
            : null
          : null,
        moment(row.closingDate).format("YYYY-MM-DD "),
        row?.bookmarked ? "Saved ✅" : "Unmarked ✘⛔",
        row,
      ),
    );

    return (
      <div style={{ display: "block", alignItems: "center" }}>
        <h2 className="logo-header">Saved Jobs</h2>

        {/* <Button
          onClick={() => {
            setEditData({});
            toggleSidebar();
          }}
          title={`Add Company`}
        />
        <Slide deviceType={deviceType}>
          {isOpen && (
            <EditPostCompany
              onCloseBtnClick={toggleSidebar}
              scrollbarHeight="100vh"
              editData={editData}
            />
          )}
        </Slide> */}
        <Box sx={{ height: 400, width: "100%" }}>
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
          {/*<Table
            columns={columns}
            data={props.data.bookmarkedJobs}
            skipReset={skipResetRef.current}
            getToggleRowSelectedProps={(a) => {
              const { original, toggleRowSelected } = a;
              return {
                onClick: () => handleCheckbox(original),
                onChange: () => toggleRowSelected(),
              };
            }}
            getAllSelectedRowsProps={(a) => {
              return {
                onClick: () => onAllCheck(a),
              };
            }}
            getCellProps={(cellInfo, allCells) => ({
              style: {
                backgroundColor: `hsl(${
                  cellInfo.column.id === "score"
                    ? cellInfo < new Date()
                      ? "red"
                      : null
                    : null
                }, 100%, 67%)`,
              },
            })}
          />*/}
        </Box>
      </div>
    );
  };
  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedBookmarksQuery>
          {(bookmarksList) => {
            if (bookmarksList.loading) {
              return <Loader />;
            }
            if (bookmarksList.data) {
              bookmarks = bookmarksList.data.bookmarkedJobs;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "Applications Page",
                  title: "Applications Page",
                }}
              >
                <TypedUpdateApplicationMutation
                  onCompleted={(data, errors) =>
                    showNotification(
                      data.patchApplication,
                      errors,
                      alert,
                      "accountErrors",
                      "Profile Created",
                    )
                  }
                >
                  {(patchApplication) => {
                    return tablePage(bookmarksList);
                  }}
                </TypedUpdateApplicationMutation>
              </MetaWrapper>
            );
          }}
        </TypedBookmarksQuery>
      )}
    </NetworkStatus>
  );
};

export default Bookmarks;
