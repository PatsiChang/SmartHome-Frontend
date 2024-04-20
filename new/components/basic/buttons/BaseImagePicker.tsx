import React, {forwardRef, useContext, useImperativeHandle, useState} from "react";
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {AppStyleClassProp} from "@/components/basic/style/StyleProvider";
import BaseButton from "@/components/basic/buttons/BaseButton";
import BaseContainer from "@/components/basic/layout/BaseContainer";
import BaseRow from "@/components/basic/layout/BaseRow";
import {BasicFormContext} from "@/components/basic/form/BasicForm";
import {ImagePickerResult, ImagePickerSuccessResult} from "expo-image-picker";
import {Action, uploadFile} from "@/lib/fetchApi";
import {convertBase64UriToBlob} from "@/lib/Base64Util";
import {BaseLargeText, BaseMiddleText} from "@/components/basic/layout/BaseText";
import {addStyleBuilder, concatStyleClass} from "@/lib/appStyleApi";
import BaseBlock from "@/components/basic/layout/BaseBlock";

export type BaseFilePickerFunction = {
    uploadImage: (url : string) => Promise<string>
}

interface BaseFilePickerProps extends AppStyleClassProp {
    imageIdFormInputName ?: string,
    allowCamera ?: boolean
    imageUploadFormInputName ?: string,
    uploadMethod ?: Action
}

function BaseImagePicker({ imageIdFormInputName, allowCamera = false, imageUploadFormInputName, uploadMethod, styleClass }: BaseFilePickerProps, ref: React.Ref<unknown> | undefined) {
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState({} as ImagePickerSuccessResult);
    const formContext = useContext(BasicFormContext);
    // const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const pickImage = async () => {
        handleImagePicked(await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }));
    };

    const camera = async () => {
        // TODO camera take photo
        handleImagePicked(await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }));
    };

    const handleImagePicked = (pickResult : ImagePickerResult) => {
        if (!pickResult.canceled) {
            setImage(pickResult);
        }
    }

    const uploadImage = async (url : string) => {
        if (image && image.assets) {
            const fileUri = image.assets[0].uri;
            if (fileUri) {
                setIsUploading(true);
                const imageId = await uploadFile(url, await convertBase64UriToBlob(fileUri), {
                    formDataName: imageUploadFormInputName,
                    method : uploadMethod
                });
                setIsUploading(false);
                if (imageId) {
                    if (formContext && imageIdFormInputName) {
                        formContext.formData.set(imageIdFormInputName, imageId);
                    }
                    return imageId;
                } else {
                    throw new Error("No imageId returned.");
                }
            }
        }
    }

    useImperativeHandle(ref, () => ({
        uploadImage: async (url) => {return uploadImage(url);}
    } as BaseFilePickerFunction));

// TODO use wrapper class of React-native image
    return (
        <BaseContainer>
            <BaseRow>
                <BaseBlock styleClass={concatStyleClass("baseImagePicker", styleClass)}>
                    {image && image.assets && <Image source={{ uri: image.assets[0].uri }} style={IMAGE_PREVIEW_SIZE}/>}
                </BaseBlock>
            </BaseRow>
            {(isUploading) ?
                <BaseLargeText>Uploading...</BaseLargeText>
                : <BaseRow>
                    <BaseButton title={"Select image"} onPress={pickImage}/>
                    {(allowCamera) ? <BaseButton title={"Take a picture"} /> : null}
                </BaseRow>}
        </BaseContainer>
    );
}

const IMAGE_PREVIEW_SIZE = {
    flex: 1
};


export default forwardRef(BaseImagePicker);