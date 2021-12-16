## Mapping data to users

Currently, when you download the report for a plio, the value of the user identifier is masked
to protect the user's identity. This becomes a barrier for organisations who need to map the
data for each plio to the actual user so that they can provide them with the adequate support.
In the longer term, we plan to figure out a way to ask the consent of our users for this beyond the Privacy Policy that they currently need to agree to before signing up for Plio. 

For now, since we are manually vetting each organisation that is using the organisational plan of Plio and are exclusively serving NGOs, we provide a way for organisations to access the true identity of their user. 

::: warning NOTE

Ensure that you are on on the organisational plan before proceeding.

:::

In Plio, any user who is a part of an organisational plan can have one of 3 roles:
- `Member`: can only edit/create/publish plios within the organisational workspace
- `Admin`: everything that a `Member` can do + some admin-level privileges like being able to add new members (however, they cannot make another member an admin)
- `Super Admin`: everything that an `Admin` can do + the highest level of privileges that exist within the organisational plan like adding new admins.

To be able to access the true identity of the users in the report for each Plio, the person downloading the report should either be an `Admin` or a `Super Admin`. To make a member either an `Admin` or a `Super Admin`, contact us. Eventually, we'll add a feature within the Plio platform itself for doing this.