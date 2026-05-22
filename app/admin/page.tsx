import AdminDashboard from '@/components/AdminDashboard';
import { getActivities } from '@/app/actions/activities';
import { getTeamMembers } from '@/app/actions/team';
import { prisma } from '@/lib/prisma';

export default async function page() {
  const incomingMessages = (await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })).map((message) => ({
    ...message,
    createdAt: message.createdAt.toISOString(),
  }));

  const activities = (await getActivities()).map((activity) => ({
    ...activity,
    createdAt: activity.createdAt.toISOString(),
  }));

  const teamMembers = await getTeamMembers();

  return (
    <div>
      <AdminDashboard
        incomingMessages={incomingMessages}
        activities={activities}
        teamMembers={teamMembers}
      />
    </div>
  );
}
