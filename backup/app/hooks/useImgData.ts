//This Hook is solely for uploading images
const useImgData = () => {
    const fetchData = (fetchInput: Parameters<typeof fetch>[0]) => async (input: FormData) => {
        try {
            console.log("Check before upload input", input);
            const response = await fetch(fetchInput, {
                method: "PUT",
                body: input,
            });
            const imgId: string = await response.text();
            return imgId;
        } catch (error) {
            return null;
        }
    }
    const updateProfilePictures = fetchData(process.env.NEXT_PUBLIC_API_URL + "/socialMedia/updateProfilePicture")
    const uploadRecipeIcon = fetchData(process.env.NEXT_PUBLIC_API_URL + "/recipe/addRecipeIcon")
    return { updateProfilePictures, uploadRecipeIcon }
}

export default useImgData;