import {
  UpdateInputCommand,
  UpdateInputRequest,
  InputDestinationRequest,
} from "@aws-sdk/client-medialive";
import { AWS_MEDIALIVE_CLIENT } from "../../common/awsConfig";

export const updateInput = async(id: string, name: string) => {
  const client = AWS_MEDIALIVE_CLIENT;

  const dest: InputDestinationRequest[] = [
    {
      StreamName: `stayg/${name}`
    },
  ];

  const input: UpdateInputRequest = {
    InputId: id,
    Destinations: dest,
  };
  const command: UpdateInputCommand = new UpdateInputCommand(input);

  try {
    const response = await client.send(command);
    console.log(response.Input);
  } catch (err) {
    console.log(err);
  }
};
updateInput('10066', '');
