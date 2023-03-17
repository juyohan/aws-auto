import { ListInputsCommand, MediaLiveClient, Input } from "@aws-sdk/client-medialive"


export const getInputs = async() => {
    const client = new MediaLiveClient({
        region : "ap-northeast-2"
    })
    
    const params = {};

    const command = new ListInputsCommand(params);
    try {
        const data = await client.send(command);
        const inputs : Input[] | undefined = data.Inputs;
        console.log(inputs);
        return inputs;
    } catch (err) {
        console.log(err);
    }
}

getInputs();