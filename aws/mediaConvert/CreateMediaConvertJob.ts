import {
	MediaConvertClient,
	Input,
	JobSettings,
	CreateJobRequest,
	OutputGroup,
	AudioSelector,
	AudioDefaultSelection,
	OutputGroupSettings,
	DashIsoGroupSettings,
	HlsGroupSettings,
	DashIsoEncryptionSettings,
	SpekeKeyProvider,
	HlsEncryptionSettings,
	HlsEncryptionType,
	HlsKeyProviderType,
	AccelerationMode,
	OutputGroupType,
	Output,
	VideoDescription,
	VideoCodecSettings,
	VideoCodec,
	H264Settings,
	H264RateControlMode,
	AudioDescription,
	CaptionSelector,
	CaptionSourceSettings,
	CaptionSourceType,
	LanguageCode,
	CaptionDescription,
	CaptionDestinationType,
	TimecodeSource,
	CreateJobCommand,
	AudioCodec,
	AacCodingMode,
	ContainerType,
	DeinterlaceAlgorithm,
	DeinterlacerMode,
	DeinterlacerControl,
	VideoTimecodeInsertion,
	AntiAlias,
	DashIsoPlaybackDeviceCompatibility,
} from '@aws-sdk/client-mediaconvert'

export const createJob = async () => {
	const client = new MediaConvertClient({
		region: 'ap-northeast-2',
		endpoint: 'https://qqvfzmfac.mediaconvert.ap-northeast-2.amazonaws.com',
	})

	const audioSelector: AudioSelector = {
		DefaultSelection: AudioDefaultSelection.DEFAULT,
	}

	const audioSelectors: Record<string, AudioSelector> = {
		// 오디오 선택기
		audio: audioSelector,
	}

	const inputs: Input[] = [
		{
			// 입력 값
			AudioSelectors: audioSelectors,
			FileInput:
				's3://live-platform-drm/videos/2023/02/24/jayb/JAY B_Clean.mp4',
		},
	]

	const dashSpekeKeyProvider: SpekeKeyProvider = {
		ResourceId: '10021', // VOD 컴포넌트 ID
		SystemIds: [
			'edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
			'9a04f079-9840-4286-ab92-e65be0885f95',
		], // 시스템 ID
		Url: 'https://kms.pallycon.com/cpix/getKey?enc-token=eyJhY2Nlc3Nfa2V5IjoiVGdoNmt5MllCUnBYd1NWYVwvbDE5bVl1eGZwY3hCeGZ1aXJcL2pZU1J4dVpCOUxUVWdubVhWY2dOVVBQbjk3OXN0Iiwic2l0ZV9pZCI6IkJDUlEifQ==', // 키 공급자 URL
	}

	const hlsSpekeKeyProvider: SpekeKeyProvider = {
		ResourceId: '10021', // VOD 컴포넌트 ID
		SystemIds: ['94ce86fb-07ff-4f43-adb8-93d2fa968ca2'], // 시스템 ID
		Url: 'https://kms.pallycon.com/cpix/getKey?enc-token=eyJhY2Nlc3Nfa2V5IjoiVGdoNmt5MllCUnBYd1NWYVwvbDE5bVl1eGZwY3hCeGZ1aXJcL2pZU1J4dVpCOUxUVWdubVhWY2dOVVBQbjk3OXN0Iiwic2l0ZV9pZCI6IkJDUlEifQ==', // 키 공급자 URL
	}

	const dashEncryption: DashIsoEncryptionSettings = {
		SpekeKeyProvider: dashSpekeKeyProvider, // DRM 암호화 정보
		PlaybackDeviceCompatibility: DashIsoPlaybackDeviceCompatibility.CENC_V1,
	}

	const dashIsoGroupSetting: DashIsoGroupSettings = {
		// DASH ISO 출력 그룹
		Destination: 's3://live-platform-drm/livevod/2023/04/24/', //S3 저장소 URL
		Encryption: dashEncryption, // DRM
		SegmentLength: 30,
		FragmentLength: 2,
	}

	const hlsEncryption: HlsEncryptionSettings = {
		EncryptionMethod: HlsEncryptionType.SAMPLE_AES, // 암호화 방법
		Type: HlsKeyProviderType.SPEKE, // 키 공급자 확인
		SpekeKeyProvider: hlsSpekeKeyProvider, // DRM 암호화 정보
	}

	const hlsGroupSetting: HlsGroupSettings = {
		// HLS 출력 그룹
		Destination: 's3://live-platform-drm/livevod/2023/04/24/', // S3 저장소 URL
		Encryption: hlsEncryption,
		SegmentLength: 10,
		MinSegmentLength: 0,
	}

	const dashIsoOutputGroupSetting: OutputGroupSettings = {
		DashIsoGroupSettings: dashIsoGroupSetting,
		Type: OutputGroupType.DASH_ISO_GROUP_SETTINGS,
	}

	const hlsOutputGroupSetting: OutputGroupSettings = {
		HlsGroupSettings: hlsGroupSetting,
		Type: OutputGroupType.HLS_GROUP_SETTINGS,
	}

	const h264Setting1080: H264Settings = {
		// 영상 비디오 코덱 설정
		RateControlMode: H264RateControlMode.CBR,
		Bitrate: 4500000,
	}

	const dashIsoVideoCodec1080: VideoCodecSettings = {
		Codec: VideoCodec.H_264,
		H264Settings: h264Setting1080,
	}

	const dashIsoVideo1080: VideoDescription = {
		CodecSettings: dashIsoVideoCodec1080,
		Height: 1080,
		Width: 1920,
		VideoPreprocessors: {
			Deinterlacer: {
				Algorithm: DeinterlaceAlgorithm.INTERPOLATE,
				Mode: DeinterlacerMode.DEINTERLACE,
				Control: DeinterlacerControl.NORMAL,
			},
		},
		TimecodeInsertion: VideoTimecodeInsertion.PIC_TIMING_SEI,
		AntiAlias: AntiAlias.ENABLED,
		Sharpness: 50,
		AfdSignaling: 'NONE',
		DropFrameTimecode: 'ENABLED',
		RespondToAfd: 'NONE',
		ColorMetadata: 'INSERT',
	}

	const h264Setting720: H264Settings = {
		// 영상 비디오 코덱 설정
		RateControlMode: H264RateControlMode.CBR,
		Bitrate: 3000000,
	}

	const dashIsoVideoCodec720: VideoCodecSettings = {
		Codec: VideoCodec.H_264,
		H264Settings: h264Setting720,
	}

	const dashIsoVideo720: VideoDescription = {
		CodecSettings: dashIsoVideoCodec720,
		Height: 720,
		Width: 1280,
		VideoPreprocessors: {
			Deinterlacer: {
				Algorithm: DeinterlaceAlgorithm.INTERPOLATE,
				Mode: DeinterlacerMode.DEINTERLACE,
				Control: DeinterlacerControl.NORMAL,
			},
		},
		TimecodeInsertion: VideoTimecodeInsertion.PIC_TIMING_SEI,
		AntiAlias: AntiAlias.ENABLED,
		Sharpness: 50,
		AfdSignaling: 'NONE',
		DropFrameTimecode: 'ENABLED',
		RespondToAfd: 'NONE',
		ColorMetadata: 'INSERT',
	}

	const h264Setting480: H264Settings = {
		// 영상 비디오 코덱 설정
		RateControlMode: H264RateControlMode.CBR,
		Bitrate: 1500000,
	}

	const dashIsoVideoCodec480: VideoCodecSettings = {
		Codec: VideoCodec.H_264,
		H264Settings: h264Setting480,
	}

	const dashIsoVideo480: VideoDescription = {
		CodecSettings: dashIsoVideoCodec480,
		Height: 480,
		Width: 854,
		VideoPreprocessors: {
			Deinterlacer: {
				Algorithm: DeinterlaceAlgorithm.INTERPOLATE,
				Mode: DeinterlacerMode.DEINTERLACE,
				Control: DeinterlacerControl.NORMAL,
			},
		},
		TimecodeInsertion: VideoTimecodeInsertion.PIC_TIMING_SEI,
		AntiAlias: AntiAlias.ENABLED,
		Sharpness: 50,
		AfdSignaling: 'NONE',
		DropFrameTimecode: 'ENABLED',
		RespondToAfd: 'NONE',
		ColorMetadata: 'INSERT',
	}

	const h264Setting360: H264Settings = {
		// 영상 비디오 코덱 설정
		RateControlMode: H264RateControlMode.CBR,
		Bitrate: 1000000,
	}

	const dashIsoVideoCodec360: VideoCodecSettings = {
		Codec: VideoCodec.H_264,
		H264Settings: h264Setting360,
	}

	const dashIsoVideo360: VideoDescription = {
		CodecSettings: dashIsoVideoCodec360,
		Height: 360,
		Width: 480,
		VideoPreprocessors: {
			Deinterlacer: {
				Algorithm: DeinterlaceAlgorithm.INTERPOLATE,
				Mode: DeinterlacerMode.DEINTERLACE,
				Control: DeinterlacerControl.NORMAL,
			},
		},
		TimecodeInsertion: VideoTimecodeInsertion.PIC_TIMING_SEI,
		AntiAlias: AntiAlias.ENABLED,
		Sharpness: 50,
		AfdSignaling: 'NONE',
		DropFrameTimecode: 'ENABLED',
		RespondToAfd: 'NONE',
		ColorMetadata: 'INSERT',
	}

	const dashIsoAudio: AudioDescription[] = [
		{
			AudioSourceName: 'audio',
			CodecSettings: {
				Codec: AudioCodec.AAC,
				AacSettings: {
					Bitrate: 96000,
					CodingMode: AacCodingMode.CODING_MODE_2_0,
					SampleRate: 48000,
				},
			},
		},
	]

	const dashIsoOutputs: Output[] = [
		{
			NameModifier: 'dashIso-1080',
			VideoDescription: dashIsoVideo1080,
			ContainerSettings: {
				Container: ContainerType.MPD,
			},
		},
		{
			NameModifier: 'dashIso-720',
			VideoDescription: dashIsoVideo720,
			ContainerSettings: {
				Container: ContainerType.MPD,
			},
		},
		{
			NameModifier: 'dashIso-480',
			VideoDescription: dashIsoVideo480,
			ContainerSettings: {
				Container: ContainerType.MPD,
			},
		},
		{
			NameModifier: 'dashIso-360',
			VideoDescription: dashIsoVideo360,
			ContainerSettings: {
				Container: ContainerType.MPD,
			},
		},
		{
			NameModifier: 'dashIso-audio',
			AudioDescriptions: dashIsoAudio,
			ContainerSettings: {
				Container: ContainerType.MPD,
			},
		},
	]

	const hlsOutputs: Output[] = [
		{
			NameModifier: 'hls-1080',
			VideoDescription: dashIsoVideo1080,
			AudioDescriptions: dashIsoAudio,
			ContainerSettings: {
				Container: ContainerType.M3U8,
				M3u8Settings: {},
			},
		},
		{
			NameModifier: 'hls-720',
			VideoDescription: dashIsoVideo720,
			AudioDescriptions: dashIsoAudio,
			ContainerSettings: {
				Container: ContainerType.M3U8,
				M3u8Settings: {},
			},
		},
		{
			NameModifier: 'hls-480',
			VideoDescription: dashIsoVideo480,
			AudioDescriptions: dashIsoAudio,
			ContainerSettings: {
				Container: ContainerType.M3U8,
				M3u8Settings: {},
			},
		},
		{
			NameModifier: 'hls-360',
			VideoDescription: dashIsoVideo360,
			AudioDescriptions: dashIsoAudio,
			ContainerSettings: {
				Container: ContainerType.M3U8,
				M3u8Settings: {},
			},
		},
	]

	const outputGroups: OutputGroup[] = [
		{
			CustomName: 'dashIso',
			Name: 'DASH ISO',
			// 출력 그룹 설정
			OutputGroupSettings: dashIsoOutputGroupSetting,
			Outputs: dashIsoOutputs,
		},
		{
			CustomName: 'hls',
			Name: 'Apple HLS',
			OutputGroupSettings: hlsOutputGroupSetting,
			Outputs: hlsOutputs,
		},
	]

	const settings: JobSettings = {
		Inputs: inputs,
		OutputGroups: outputGroups,
		TimecodeConfig: {
			Source: TimecodeSource.ZEROBASED,
		},
	}

	const input: CreateJobRequest = {
		Settings: settings,
		Role: 'arn:aws:iam::773830787333:role/service-role/MediaConvert_Default_Role',
		AccelerationSettings: {
			Mode: AccelerationMode.DISABLED,
		},
	}

	const command = new CreateJobCommand(input)

	try {
		const data = client.send(command)
		console.log(data)
	} catch (err) {
		console.log(err)
	}
}

createJob()
