import { Tag } from "antd";
const getStatusTag = (status: string) => {
		switch (status.toLowerCase()) {
			case "draft":
				return <Tag color="orange">Draft</Tag>;
			case "rejected":
				return <Tag color="red">Rejected</Tag>;
			case "approved":
				return <Tag color="green">Approved</Tag>;
			default:
				return <Tag>{status}</Tag>;
		}
	};

	export default getStatusTag;