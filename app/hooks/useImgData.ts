
const useImgData = () => {
    const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => async (input: FormData) => {
        try {
            console.log("Check before upload input", input);
            const response = await fetch(fetchInput, {
                method: "PUT",
                body: input,
            });
            const profilePictureID: string = await response.text();
            return profilePictureID;
        } catch (error) {
            return null;
        }
    }
    const updateProfilePictures = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia/updateProfilePicture")
    return { updateProfilePictures }

}

export default useImgData;