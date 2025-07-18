import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Starting database seeding...');

	// Create admin user
	const adminPassword = await bcrypt.hash('admin123', 12);
	const admin = await prisma.user.upsert({
		where: { email: 'admin@worknet.com' },
		update: {},
		create: {
			email: 'admin@worknet.com',
			name: 'WorkNet Admin',
			passwordHash: adminPassword,
			role: 'admin',
			status: 'active'
		}
	});
	console.log('✅ Created admin user:', admin.email);

	// Create a sample client
	const clientPassword = await bcrypt.hash('client123', 12);
	const client = await prisma.user.upsert({
		where: { email: 'client@worknet.com' },
		update: {},
		create: {
			email: 'client@worknet.com',
			name: 'John Client',
			passwordHash: clientPassword,
			role: 'client',
			status: 'active'
		}
	});
	console.log('✅ Created client user:', client.email);

	// Create a sample freelancer
	const freelancerPassword = await bcrypt.hash('freelancer123', 12);
	const freelancer = await prisma.user.upsert({
		where: { email: 'freelancer@worknet.com' },
		update: {},
		create: {
			email: 'freelancer@worknet.com',
			name: 'Jane Freelancer',
			passwordHash: freelancerPassword,
			role: 'freelancer',
			status: 'active'
		}
	});
	console.log('✅ Created freelancer user:', freelancer.email);

	// Create freelancer profile
	const freelancerProfile = await prisma.freelancerProfile.upsert({
		where: { userId: freelancer.id },
		update: {},
		create: {
			userId: freelancer.id,
			title: 'Full-Stack Developer',
			description: 'Experienced developer specializing in TypeScript, React, and Node.js',
			hourlyRate: 50.00,
			skills: JSON.stringify(['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma']),
			experience: 'intermediate',
			availability: 'full-time',
			isAvailable: true,
			totalEarnings: 0.00,
			completedJobs: 0,
			successRate: 0.00,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	});
	console.log('✅ Created freelancer profile for:', freelancer.name);

	// Create a sample job posting
	const job = await prisma.job.create({
		data: {
			clientId: client.id,
			title: 'Build a Modern Web Application',
			description: 'Looking for an experienced developer to build a modern web application using SvelteKit and TypeScript.',
			budget: 2500.00,
			timeline: '4-6 weeks',
			skills: JSON.stringify(['SvelteKit', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']),
			experienceLevel: 'intermediate',
			status: 'open',
			isRemote: true,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	});
	console.log('✅ Created sample job:', job.title);

	// Create a sample proposal
	const proposal = await prisma.proposal.create({
		data: {
			jobId: job.id,
			freelancerId: freelancer.id,
			coverLetter: 'I am very interested in this project and have extensive experience with SvelteKit and TypeScript.',
			proposedRate: 55.00,
			estimatedHours: 40,
			deliveryTime: '5 weeks',
			status: 'pending',
			createdAt: new Date(),
			updatedAt: new Date()
		}
	});
	console.log('✅ Created sample proposal from:', freelancer.name);

	// Create admin log entry
	await prisma.adminLog.create({
		data: {
			adminId: admin.id,
			action: 'user_created',
			targetType: 'user',
			targetId: freelancer.id,
			description: 'Freelancer account created during database seeding',
			metadata: JSON.stringify({ seedingProcess: true }),
			createdAt: new Date()
		}
	});
	console.log('✅ Created admin log entry');

	console.log('🎉 Database seeding completed successfully!');
	console.log('\n📋 Test Accounts Created:');
	console.log('👤 Admin: admin@worknet.com / admin123');
	console.log('👤 Client: client@worknet.com / client123');
	console.log('👤 Freelancer: freelancer@worknet.com / freelancer123');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error('❌ Error seeding database:', e);
		await prisma.$disconnect();
		process.exit(1);
	});
