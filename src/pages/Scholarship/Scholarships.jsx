import React, { useEffect, useState } from "react";
import AddScholarship from "./AddScholarship";
import Scholarship from "./Scholarship";
import "./scholarship.css";

const Scholarships = ({ axiosInstance }) => {
	const [scholarships, setScholarships] = useState([]);
	const [showAddScholarshipBox, setShowAddScholarshipBox] = useState(false);
	const handleNewScholarship =async (a) => {
		try {
			const res= await axiosInstance.get("/api/scholarship/");
			console.log(res);
	
				setScholarships(res.data);
			
		} catch (err) {
			console.log(err);
		}
		setScholarships([...scholarships, a]);
		setShowAddScholarshipBox(false);
	};
	useEffect(()=>{
		handleNewScholarship();
	},[])
	return (
		<div className="scholarships-container">
			<div className="scholarships-box">
				<div className="scholarships-head">
					<span>All Scholarships</span>
				</div>
				<div className="scholarships-add">
				scholarship<button
						className="aavesh-btn"
						onClick={() => setShowAddScholarshipBox(true)}
					>
						<span className="aavesh-btn-text">
							Add a new Scholarship
						</span>
					</button>
				</div>
				<div className="scholarships-body">
					<div className="Row">
						{scholarships.map((scholarship, index) => (
							<div
								className="Col-lg-50 Col-md-100 Col-sm-100"
								key={index}
							>
								<Scholarship axiosInstance={axiosInstance} scholarship={scholarship} />
							</div>
						))}
					</div>
				</div>
			</div>
			{showAddScholarshipBox && (
				<AddScholarship
					close={() => setShowAddScholarshipBox(false)}
					
					axiosInstance={axiosInstance}
				/>
			)}
		</div>
	);
};

export default Scholarships;
