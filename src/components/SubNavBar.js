import { Grid } from "@mui/material";

export default function SubNavBar(props) {
    return (
        <Grid container>
            <Grid item xs={6}>
                <h5 className="ms-4 mt-2 mb-3 text-muted">Overview</h5>
            </Grid>
            <Grid item xs={6}>
                <Grid container className="m-0 p-0 mt-2 mb-3" spacing={0}>
                    <Grid item xs={12} md={6}>
                        <div style={{ backgroundColor: "#F5F6FC", display: 'flex', justifyContent: "flex-end", alignItems: "center" }} className="text-muted pe-4">Last update: {props.updatedTime}</div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ backgroundColor: "#F5F6FC", display: 'flex', justifyContent: "flex-end", alignItems: "center" }} className="text-muted pe-4">Period: Current month</div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}