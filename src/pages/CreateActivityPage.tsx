import { useLocation, useNavigate } from "react-router-dom";
import { CreateModal } from "../features/create/CreateModal";
import type { Activity } from "../types";

export function CreateActivityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.state?.editMode;
  const editingActivity = location.state?.activity as Activity | undefined;
  const activityData = location.state?.activityData as Activity | undefined;
  
  const handleClose = () => {
    // Navigate back to my activities instead of search
    navigate('/my-activities');
  };

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <CreateModal 
        open={true} 
        onClose={handleClose} 
        type="activity" 
      />
    </div>
  );
}
