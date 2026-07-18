-- Copyright (c) 2026 Cup Compass. All rights reserved.
-- Amazon Associates application approved — add the merchant row so the link
-- resolver can generate tagged Amazon links (grinders, drip machines, K-cups).

insert into merchants (slug, name, network, status, base_url, affiliate_id, notes) values
  (
    'amazon',
    'Amazon',
    'amazon_associates',
    'active',
    'https://www.amazon.com',
    'cupcompass-20',
    'Covers grinders, drip/pour-over machines, and single-serve pods sold on Amazon. Product-specific paths (e.g. dp/ASIN) go in products.merchant_product_path.'
  );
