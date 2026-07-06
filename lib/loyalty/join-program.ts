import { createCustomer } from "./create-customer";
import { createMembership } from "./create-membership";
import { createCard } from "./create-card";

type JoinProgramProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  programId: string;
};

export async function joinProgram({
  firstName,
  lastName,
  email,
  phone,
  programId,
}: JoinProgramProps) {
  // Step 1 - Find or create the customer
  const customer = await createCustomer({
    firstName,
    lastName,
    email,
    phone,
  });

  // Step 2 - Find or create the membership
  const membership = await createMembership({
    customerId: customer.id,
    programId,
  });

  // Step 3 - Find or create the loyalty card
  const card = await createCard({
    customerId: customer.id,
    programId,
  });

  return {
    customer,
    membership,
    card,
  };
}