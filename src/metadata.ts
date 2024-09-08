/* eslint-disable */
export default async () => {
	const t = {};
	return {
		"@nestjs/swagger": {
			models: [],
			controllers: [
				[
					import("./module/http/ping/ping.controller"),
					{ PingController: { ping: { type: String } } },
				],
				[
					import("./module/prisma/prisma.controller"),
					{ PrismaController: { getMetrics: { type: String } } },
				],
			],
		},
	};
};
