import { Button } from "reactstrap";

const ControllMenu = ({ saveBlog, isSaving }) => {
  return (
    <div className="controll-menu">
      <h1 className="title"> Write Your Story... </h1>
      <div className="status-box">{isSaving ? "Saving..." : "Saved"}</div>
      <Button disabled={isSaving} onClick={saveBlog} color="success">
        Save
      </Button>
    </div>
  );
};

export default ControllMenu;
