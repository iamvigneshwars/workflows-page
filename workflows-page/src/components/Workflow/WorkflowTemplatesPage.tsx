import useFetchWorkflowTemplates from "../../hooks/useFetchWorkflowTemplates";
import { Box, Container, Paper, styled } from "@mui/material";
import PopUpForm from "../JsonForms/PopUpForm";
import { useState } from "react";

const WorkflowTemplates = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setOpenModalIndex(index);
  };

  const handleClose = () => {
    setOpenModalIndex(null);
  };

  const templates = useFetchWorkflowTemplates();

  const CustomPaper = styled(Paper)(({ theme }) => ({
    width: 200,
    height: 50,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
    cursor: "pointer",
  }));

  return (
    <Container sx={{ p: 1, py: 4 }}>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        padding={2}
        overflow="auto"
        justifyContent={"center"}
      >
        {templates?.map((template, index) => (
          <Box key={index} sx={{ mb: 2, p: 1 }}>
            <CustomPaper elevation={4} onClick={() => handleOpen(index)}>
              <Box display={"flex"} justifyContent={"center"}>
                {template?.name}
              </Box>
            </CustomPaper>
            <PopUpForm
              open={openModalIndex === index}
              onClose={handleClose}
              json_schema={template?.jsonSchema}
              ui_schema={template?.UISchema}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default WorkflowTemplates;
