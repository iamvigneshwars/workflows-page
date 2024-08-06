import useFetchWorkflowTemplates from "../../hooks/useFetchWorkflowTemplates";
import { Box, Container, Paper, styled } from "@mui/material";

const WorkflowTemplates = () => {
  const templates = useFetchWorkflowTemplates();

  const CustomPaper = styled(Paper)(({ theme }) => ({
    width: 200,
    height: 200,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
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
            <CustomPaper elevation={4}>
              <Box display={"flex"} justifyContent={"center"}>
                {template?.name}
              </Box>
            </CustomPaper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default WorkflowTemplates;
