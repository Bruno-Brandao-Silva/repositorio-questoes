import upload from "../middleware/upload";

const uploadFiles = async (req: any, res: any) => {
    try {
        await upload(req, res);
        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }
        var baseUrl = req.headers.host + '/api/image/'
        if (req.headers.host.toString().includes('localhost')) {
            baseUrl = 'http://' + baseUrl
        } else {
            baseUrl = 'https://' + baseUrl
        }
        for (let i = 0; i < req.files.length; i++) {
            req.files[i].host = baseUrl
        }
        return res.status(200).send({
            message: "Files have been uploaded.", files: req.files
        });
    } catch (error: any) {
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }
        return res.status(500).send({
            message: "500 Internal Server Error: " + error
        });
    }
};
export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default uploadFiles