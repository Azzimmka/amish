import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface QuoteTemplateProps {
  fullName: string;
  phone: string;
  email: string;
  projectLocation: string;
  selectedGarageId?: string;
}

export const QuoteTemplate = ({
  fullName,
  phone,
  email,
  projectLocation,
  selectedGarageId,
}: QuoteTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Quote Request from {fullName} - Amish Built Garages</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Lead: Amish Built Garages</Heading>
          <Text style={text}>
            You have received a new quote request from the website. Here are the details:
          </Text>
          
          <Section style={section}>
            <Text style={label}>Customer Name:</Text>
            <Text style={value}>{fullName}</Text>
            
            <Text style={label}>Phone Number:</Text>
            <Text style={value}>
              <a href={`tel:${phone}`} style={link}>{phone}</a>
            </Text>
            
            <Text style={label}>Email Address:</Text>
            <Text style={value}>
              <a href={`mailto:${email}`} style={link}>{email}</a>
            </Text>
            
            <Text style={label}>Project Location:</Text>
            <Text style={value}>{projectLocation}</Text>

            {selectedGarageId && (
              <>
                <Hr style={hr} />
                <Text style={label}>Selected Design Configuration:</Text>
                <Text style={highlight}>{selectedGarageId}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            This email was sent automatically from your website (Amish Built Garages).
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#fcfaf7",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 16px rgba(26,46,26,0.1)",
};

const h1 = {
  color: "#1a2e1a",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "0 40px",
  margin: "30px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 40px",
};

const section = {
  padding: "24px 40px",
  backgroundColor: "#fcfaf7",
  borderRadius: "8px",
  margin: "0 40px",
  border: "1px solid #e6ebf1",
};

const label = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  color: "#888",
  fontWeight: "bold",
  margin: "0 0 4px",
  letterSpacing: "1px",
};

const value = {
  fontSize: "16px",
  color: "#1a2e1a",
  margin: "0 0 20px",
  fontWeight: "600",
};

const highlight = {
  fontSize: "16px",
  color: "#b87333",
  margin: "0",
  fontWeight: "bold",
  padding: "12px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  borderLeft: "4px solid #b87333",
};

const link = {
  color: "#b87333",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 40px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  padding: "0 40px",
};

export default QuoteTemplate;
