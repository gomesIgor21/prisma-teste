import { PrismaClient } from '@prisma/client';

const pc = new PrismaClient();

async function main() {
	await pc.role.createMany({
		data: [{ name: 'admin' }, { name: 'user' }],
	});
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => await pc.$connect());
