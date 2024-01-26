import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const router = useRouter();

useEffect(() => {
    const redir = async () => {
        const supabase = createClientComponentClient()
        const code = router.query.code;
        const next = router.query.next;
        if (code) {
            await supabase.auth.exchangeCodeForSession(Array.isArray(code) ? code[0] : code);
        }

        if (next) {
            router.push(Array.isArray(next) ? next[0] : next);
        }
    };

    redir();
}, [router]);

